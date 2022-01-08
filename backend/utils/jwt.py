import jwt
from flask import request, jsonify
from functools import wraps

def get_token_decorator(app, User):

    def token_required(f):

        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            if 'x-access-token' in request.headers:
                token = request.headers['x-access-token']
            if not token:
                return jsonify({'message': 'No authentication token present. Log in first!'}), 401

            try:
                data = jwt.decode(token, app.config['SECRET_KEY'], algorithms="HS256")
                current_user = User.query \
                    .filter_by(public_id=data['public_id']) \
                    .first()
            except Exception as exc:
                app.logger.info("Exception when decoding token {}".format(exc))
                return jsonify({
                    'message': 'Authentication token is invalid. Log in first!'
                }), 401

            return f(current_user, *args, **kwargs)

        return decorated

    return token_required
