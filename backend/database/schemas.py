from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Car, Reviews,FavoriteBooks

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    username = fields.String(primary_key=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("username",  "password", "first_name", "last_name", "email")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)

class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email",)

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Car Schemas
class CarSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    make = fields.String(required=True)
    model = fields.String(required=True)
    year = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "make", "model", "year", "user_id", "user")

    @post_load
    def create_car(self, data, **kwargs):
        return Car(**data)

car_schema = CarSchema()
cars_schema = CarSchema(many=True)


# TODO: Add your schemas below
class ReviewSchema(ma.Schema):
    book_id=fields.String(primary_key=True)
    review_text=fields.String(primary_key=True)
    rating=fields.Integer(required=True)
    user_username=fields.String()
    thumbnail_url=fields.String(required=True)
    user=ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "book_id", "review_text", "rating", "user_username","thumbnail_url", "user")

    @post_load
    def create_review(self, data, **kwargs):
        return Reviews(**data)

review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)

class FavoriteBookSchema(ma.Schema):
    id=fields.Integer(primary_key=True)
    book_id=fields.String(required=True)
    title=fields.String(required=True)
    thumbnail_url=fields.String(required=True)
    user_username=fields.String()
    user=ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "book_id", "title", "thumbnail_url", "user_username", "user")

    @post_load
    def create_favorite_book(self, data, **kwargs):
        return FavoriteBooks(**data)

favorite_book_schema = FavoriteBookSchema()
favorite_books_schema = FavoriteBookSchema(many=True)