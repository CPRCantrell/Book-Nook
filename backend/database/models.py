from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    username = db.Column(db.String(255), primary_key=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(255), nullable=False)
    model = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer)
    # Adds user_id as an Integer column on the car table which references the id column on user table
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # Establishes object relation between car-user so we can grab values like car.user.username
    user = db.relationship("User")

# TODO: Add your models below, remember to add a new migration and upgrade database
class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id=db.Column(db.String, nullable=False)
    review_text=db.Column(db.String, nullable=False)
    rating=db.Column(db.Integer, nullable=False)
    user_username=db.Column(db.String, db.ForeignKey('user.username'))
    user = db.relationship("User")

class FavoriteBooks(db.Model):
    id =db.Column(db.Integer, primary_key=True)
    book_id=db.Column(db.String, nullable=False)
    title=db.Column(db.String, nullable=False)
    thumbnail_url=db.Column(db.String, nullable=False)
    user_username=db.Column(db.String, db.ForeignKey('user.username'))
    user = db.relationship("User")
