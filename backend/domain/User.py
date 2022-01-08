import uuid

def get_user_model(db):
    class User(db.Model):
        public_id = db.Column(db.String(50), unique=True)
        email = db.Column(db.String, primary_key=True)
        name = db.Column(db.String(250))
        password = db.Column(db.String(80))
        type = db.Column(db.String(20))
        faculty = db.Column(db.String(250))
        interests = db.Column(db.String(500))

        def __init__(self, email, password, name="", type="", faculty="", interests=""):
            self.public_id = str(uuid.uuid4())
            self.email = email
            self.password = password
            self.name = name
            self.type = type
            self.faculty = faculty
            self.interests = interests  # parse this and csv

        def update(self, **kwargs):
            for key, value in kwargs.items():
                if hasattr(self, key):
                    if getattr(self, key) != value and value is not None:
                        setattr(self, key, value)

    return User