import uuid

def get_listing_model(db):

    class Listing(db.Model):
        public_id = db.Column(db.String(50), primary_key=True)
        title = db.Column(db.String(255))
        company = db.Column(db.String(255))
        description = db.Column(db.String(5500))
        salary = db.Column(db.String(250))
        remote = db.Column(db.String(50))
        keywords = db.Column(db.String(255))
        datelastregister = db.Column(db.String(10))
        duration = db.Column(db.String(50))
        endingdate = db.Column(db.String(10))

        def __init__(self, title, company, description, salary="", remote="", keywords="", datelastregister="", duration="",
                     endingdate=""):
            self.public_id = str(uuid.uuid4())
            self.title = title
            self.company = company
            self.description = description
            self.salary = salary
            self.remote = remote
            self.keywords = keywords
            self.datelastregister = datelastregister
            self.duration = duration
            self.endingdate = endingdate

        def update(self, **kwargs):
            for key, value in kwargs.items():
                if hasattr(self, key):
                    if getattr(self, key) != value and value is not None:
                        setattr(self, key, value)

    return Listing