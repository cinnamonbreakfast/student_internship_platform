import uuid

def get_application_model(db):
    class ApplicationModel(db.Model):
        public_id = db.Column(db.String(50), primary_key=True)
        email = db.Column(db.String(255))
        listing_id = db.Column(db.String(255))
        status = db.Column(db.String(255))
        motivation = db.Column(db.String(5000))

        def __init__(self, email, listing_id, status="pending", motivation=""):
            self.public_id = str(uuid.uuid4())
            self.email = email
            self.listing_id = listing_id
            self.status = status
            self.motivation = motivation

        def update(self, **kwargs):
            for key, value in kwargs.items():
                if hasattr(self, key):
                    if getattr(self, key) != value and value is not None:
                        setattr(self, key, value)

    return ApplicationModel