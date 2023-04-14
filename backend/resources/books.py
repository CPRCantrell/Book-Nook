from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Reviews,FavoriteBooks
from database.schemas import review_schema,reviews_schema,favorite_books_schema,favorite_book_schema

class UserReviews(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_review=review_schema.load(form_data)
        new_review.user_username=user_id
        db.session.add(new_review)
        db.session.commit()
        return review_schema.dump(new_review), 201

class UserFavorites(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_favorite=favorite_book_schema.load(form_data)
        new_favorite.user_username=user_id
        db.session.add(new_favorite)
        db.session.commit()
        return favorite_book_schema.dump(new_favorite), 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_favorites = FavoriteBooks.query.filter_by(user_username=user_id)
        return favorite_books_schema.dump(user_favorites), 200

class GetBookInfo(Resource):
    def get(self,book_id):
        # Alternate version where JWT is used, but not required
        book_id = book_id.replace('-', ' ')
        all_reviews = Reviews.query.filter_by(book_id=book_id)

        all_reviews = reviews_schema.dump(all_reviews)
        print(all_reviews)
        all_ratings = [rev['rating'] for rev in all_reviews]
        avg_rating = sum(all_ratings)/len(all_ratings)

        json={
            "reviews": all_reviews,
            "average_rating": avg_rating
        }
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            test = db.session.query(FavoriteBooks).filter(
                FavoriteBooks.user_username.like(user_id),
                FavoriteBooks.book_id.like(book_id)
            ).first()

            if test:
                json["favorited"] = True
            else:
                json["favorited"] = False


        except:
            json["favorited"]="not_logged_in"

        return json, 200



