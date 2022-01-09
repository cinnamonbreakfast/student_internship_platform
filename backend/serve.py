import uuid

from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import logging
import jwt
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

from domain.User import get_user_model
from domain.Listing import get_listing_model
from domain.Application import get_application_model
from utils.jwt import get_token_decorator
from utils.utils import retrieve_if_not_empty, filter_by


def setup_db(app, secret_key, uri, track_modifs):
    app.config['SECRET_KEY'] = secret_key
    app.config['SQLALCHEMY_DATABASE_URI'] = uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = track_modifs
    return SQLAlchemy(app)


app = Flask(__name__)

logging.basicConfig(filename='server.log', level=logging.DEBUG,
                    format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')
db = setup_db(app, 'mamacatdesecuresuntembabaieti', 'sqlite:///DatabaseRE.db', True)

User = get_user_model(db)
Listing = get_listing_model(db)
ApplicationModel = get_application_model(db)

token_required = get_token_decorator(app, User)

@app.route('/login', methods=['POST'])
def login():
    try:
        auth = request.json

        if not auth or not auth.get('email') or not auth.get('password'):
            return make_response(
                'Insufficient information',
                401
            )

        user = User.query \
            .filter_by(email=auth.get('email')) \
            .first()

        if not user:
            return make_response(
                'User doesn\'t exist',
                401
            )

        if check_password_hash(user.password, auth.get('password')):
            # generates the JWT Token
            token = jwt.encode({
                'public_id': user.public_id,
                'exp': datetime.utcnow() + timedelta(minutes=30)
            }, app.config['SECRET_KEY'], algorithm="HS256")

            return make_response(
                jsonify(token=token,
                        name=user.name,
                        email=user.email,
                        user_id=user.public_id,
                        type=user.type),
                200,
            )
        return make_response(
            'Unsuccessful login',
            401,
        )

    except Exception as exc:
        app.logger.error("Unhandled exception: {}".format(str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened"),
            400
        )


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json

        email, password = data.get('email'), data.get('password')
        type = data.get("type") or "student"

        user = User.query \
            .filter_by(email=email) \
            .first()
        if not user:
            user = User(
                email=email,
                password=generate_password_hash(password),
                type=type
            )
            db.session.add(user)
            db.session.commit()

            return make_response(jsonify(name=user.name,
                                         email=user.email,
                                         user_id=user.public_id,
                                         type=user.type),
                                 200)
        else:
            return make_response(jsonify(error='User already exists. Please Log in.'),
                                 400)
    except Exception as exc:
        app.logger.error("Unhandled exception at register: {}".format(str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened"),
            400
        )

@app.route("/user/profile", methods=["GET"])
@token_required
def get_user_profile(current_user):
    try:
        user = User.query.filter_by(email=current_user.email).first()
        return make_response(jsonify(
            name=user.name,
            email=user.email,
            user_id=user.public_id,
            type=user.type,
            faculty=user.faculty,
            interests=user.interests
        ),
            200)
    except Exception as exc:
        app.logger.error("Error when getting user profile.\n{}".format(str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened. Try again later!"),
            400
        )


@app.route("/user/profile", methods=["POST"])
@token_required
def update_user_profile(current_user):
    try:
        data = request.json

        if data['email'] != current_user.email:
            return make_response(
                jsonify(error="Can't update someone else's profile."),
                400
            )

        user = User.query.filter_by(email=current_user.email).first()

        user.update(name=retrieve_if_not_empty(data['name']),
                    type=retrieve_if_not_empty(data['type']),
                    faculty=retrieve_if_not_empty(data['faculty']),
                    interests=retrieve_if_not_empty(data['interests'])
                    )

        return make_response(jsonify(name=user.name,
                                     email=user.email,
                                     user_id=user.public_id,
                                     type=user.type,
                                     faculty=user.faculty,
                                     interests=user.interests
                                     ),
                             204)

    except Exception as exc:
        app.logger.error("Error when updating user profile.\n{}".format(str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened. Try again later!"),
            400
        )


@app.route("/listings/new", methods=["POST"])
@token_required
def add_listing(current_user):
    try:
        if current_user.type != "recruiter":
            app.logger.info("Add listing attempted by non-recruiter")
            return make_response(
                jsonify(error="Not enough permissions to add listings, must be a recruiter"),
                400
            )

        data = request.json
        if not data['title'] or not data['company'] or not data['description']:
            app.logger.info("Tried new listing with too little information:\n{}".format(data))
            return make_response(
                jsonify(error="Not enough information for new listing"),
                400
            )

        listing = Listing(
            data['title'],
            data['company'],
            data['description'],
            data['salary'],
            data['remote'],
            data['keywords'],
            data['datelastregister'],
            data['duration'],
            data['endingdate']
        )
        db.session.add(listing)
        db.session.commit()

        return make_response(jsonify(id=listing.public_id,
                                     title=listing.title,
                                     company=listing.company,
                                     description=listing.description,
                                     salary=listing.salary,
                                     remote=listing.remote,
                                     keywords=listing.keywords,
                                     datelastregister=listing.datelastregister,
                                     duration=listing.duration,
                                     endingdate=listing.endingdate),
                             200)
    except Exception as exc:
        app.logger.error("Error when adding new listing.\n{}".format(str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened. Try again later!"),
            400
        )


@app.route('/listings', methods=["GET"])
@token_required
def get_all_listings(current_user):
    try:
        listings = Listing.query.all()
        output = []
        for listing in listings:
            output.append(
                {
                    "id": listing.public_id,
                    "title": listing.title,
                    "company": listing.company,
                    "description": listing.description,
                    "salary": listing.salary,
                    "remote": listing.remote,
                    "keywords": listing.keywords,
                    "datelastregister": listing.datelastregister,
                    "duration": listing.duration,
                    "endingdate": listing.endingdate
                }
            )
        return make_response(jsonify(output),
                             200)
    except Exception as exc:
        app.logger.error("Error when getting all listings.\n{}".format(str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened. Try again later!"),
            400
        )


@app.route('/listing/<listing_id>', methods=["GET"])
@token_required
def get_listing_info(current_user, listing_id):
    try:
        listing = Listing.query.filter_by(public_id=listing_id).first()
        return make_response(jsonify(id=listing.public_id,
                                     title=listing.title,
                                     company=listing.company,
                                     description=listing.description,
                                     salary=listing.salary,
                                     remote=listing.remote,
                                     keywords=listing.keywords,
                                     datelastregister=listing.datelastregister,
                                     duration=listing.duration,
                                     endingdate=listing.endingdate),
                             200)
    except Exception as exc:
        app.logger.error("Error when getting listing {}.\n{}".format(listing_id, str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened. Try again later!"),
            400
        )


@app.route('/listings/search', methods=["POST"])
@token_required
def search_in_listings(current_user):
    try:
        data = request.json

        search_items = data['searchfor']

        output = []
        all_listings = Listing.query.all()

        for listing in all_listings:
            if any(ext in listing.description for ext in search_items):
                output.append(
                    {
                        "id": listing.public_id,
                        "title": listing.title,
                        "company": listing.company,
                        "description": listing.description,
                        "salary": listing.salary,
                        "remote": listing.remote,
                        "keywords": listing.keywords,
                        "datelastregister": listing.datelastregister,
                        "duration": listing.duration,
                        "endingdate": listing.endingdate
                    }
                )
        return make_response(jsonify(output),
                             200)
    except Exception as exc:
        app.logger.error("Error when searching listing.\n{}".format(str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened. Try again later!"),
            400
        )


@app.route('/listings/filtered', methods=["POST"])
@token_required
def filter_listings(current_user):
    try:
        data = request.json
        all_listings = Listing.query.all()
        output_listings = all_listings
        output = []

        for item in ["title", "keywords", "company", "remote"]:
            if retrieve_if_not_empty(data[item]):
                output_listings = filter_by(output_listings, item, data[item])

        def filter_range(object_value, values, is_date=False):
            point1, point2 = values
            if is_date:
                point1 = datetime.fromisoformat(point1)
                point2 = datetime.fromisoformat(point2)
            if isinstance(object_value, list):
                object_point1, object_point2 = object_value
                if is_date:
                    object_point1 = datetime.fromisoformat(object_point1)
                    object_point2 = datetime.fromisoformat(object_point2)

                if point1 >= object_point1 and point2 <= object_point2:
                    return True
            else:
                if point1 <= object_value <= point2:
                    return True
            return False

        for item in ['salary', 'duration', 'experience']:
            if retrieve_if_not_empty(data[item]):
                output_listings = filter_by(output_listings, item, data[item], filter_range, is_date=False)

        for item in ['endingdate', 'datelastregister']:
            if retrieve_if_not_empty(data[item]):
                output_listings = filter_by(output_listings, item, data[item], filter_range, is_date=True)

        for listing in output_listings:
            output.append(
                {
                    "id": listing.public_id,
                    "title": listing.title,
                    "company": listing.company,
                    "description": listing.description,
                    "salary": listing.salary,
                    "remote": listing.remote,
                    "keywords": listing.keywords,
                    "datelastregister": listing.datelastregister,
                    "duration": listing.duration,
                    "endingdate": listing.endingdate
                }
            )
        return make_response(jsonify(output),
                             200)

    except Exception as exc:
        app.logger.error("Error when getting listing.\n{}".format(str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened. Try again later!"),
            400
        )


@app.route("/listing/<listing_id>/apply", methods=["POST"])
@token_required
def apply_for_listing(current_user, listing_id):
    try:

        application = ApplicationModel(current_user.email,
                                       listing_id
                                       )
        db.session.add(application)
        db.session.commit()

        return make_response(jsonify(public_id=application.public_id,
                                     email=application.email,
                                     listing_id=application.listing_id,
                                     status=application.status,
                                     motivation=application.motivation
                                     ), 200)
    except Exception as exc:
        app.logger.error(
            "Error when {} applying to listing {}.\n{}".format(current_user.public_id, listing_id, str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened. Try again later!"),
            400
        )


@app.route("/listing/<listing_id>/applications", methods=["GET"])
@token_required
def get_all_applications_for_listing(current_user, listing_id):
    try:
        if current_user.type != "recruiter":
            return make_response(jsonify(error="Only recruiters can see the applications"),
                                 400)

        applications = ApplicationModel.query().filter_by(listing_id=listing_id).all()
        output = []

        for application in applications:
            output.append(jsonify(application_id=application.public_id,
                                  email=application.email,
                                  listing_id=application.listing_id,
                                  status=application.status,
                                  motivation=application.motivation
                                  )
                          )

        return make_response(jsonify(output),
                             200)

    except Exception as exc:
        app.logger.error("Error when getting all applications for listing {}.\n{}".format(listing_id, str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened. Try again later!"),
            400
        )


@app.route("/applications/mine", methods=["GET"])
@token_required
def get_my_applications(current_user):
    try:
        applications = ApplicationModel.query().filter_by(email=current_user.email).all()
        output = []

        for application in applications:
            output.append(jsonify(application_id=application.public_id,
                                  email=application.email,
                                  listing_id=application.listing_id,
                                  status=application.status,
                                  motivation=application.motivation
                                  )
                          )

        return make_response(jsonify(output),
                             200)

    except Exception as exc:
        app.logger.error("Error when getting my applications.\n{}".format(str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened. Try again later!"),
            400
        )


@app.route("/listing/<listing_id>/applications/<application_id>", methods=["POST"])
@token_required
def accept_reject_application(current_user, listing_id, application_id):
    try:
        data = request.json

        application = ApplicationModel.query().filter_by(application_id=application_id).first()

        application.update(status=retrieve_if_not_empty(data['status']),
                           motivation=retrieve_if_not_empty(data['motivation'])
                           )

        return make_response(jsonify(application_id=application.public_id,
                                     email=application.email,
                                     listing_id=application.listing_id,
                                     status=application.status,
                                     motivation=application.motivation
                                     ),
                             200)

    except Exception as exc:
        app.logger.error(
            "Error when changing state of application {} (listing {}) for user {}.\n{}".format(application_id,
                                                                                               listing_id,
                                                                                               current_user.public_id,
                                                                                               str(exc)))
        return make_response(
            jsonify(error="Something unexpected happened. Try again later!"),
            400
        )


if __name__ == "__main__":
    db.create_all()
    app.run(port=50321, debug=True)
