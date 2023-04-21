from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Reviews,FavoriteBooks
from database.schemas import review_schema,reviews_schema,favorite_books_schema,favorite_book_schema
from sqlalchemy import and_, delete

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

    @jwt_required()
    def delete(self):
        user_id = get_jwt_identity()
        book_id = request.form.get('book_id')
        # review=Reviews.query.get((book_id,user_id))
        # db.session.delete(review)
        # db.session.commit()
        stmt=(
            delete(Reviews).
            where(and_(Reviews.book_id==book_id,Reviews.user_username==user_id))
        )
        db.session.execute(stmt)
        db.session.commit()
        return '',200

    @jwt_required()
    def put(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        review=Reviews.query.get((form_data['book_id'],user_id))
        review.review_text=form_data['review_text']
        review.rating=form_data['rating']
        db.session.commit()
        return review_schema.dump(review),200

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

    @jwt_required()
    def delete(self):
        
        user_id = get_jwt_identity()
        book_id = request.form.get('book_id')
        # review=Reviews.query.get((book_id,user_id))
        # db.session.delete(review)
        # db.session.commit()
        stmt=(
            delete(FavoriteBooks).
            where(and_(FavoriteBooks.book_id==book_id,FavoriteBooks.user_username==user_id))
        )
        db.session.execute(stmt)
        db.session.commit()
        return '',200

class GetBookInfo(Resource):
    def get(self,book_id):
        # Alternate version where JWT is used, but not required
        book_id = book_id.replace('-', ' ')
        all_reviews = Reviews.query.filter_by(book_id=book_id)

        all_reviews = reviews_schema.dump(all_reviews)
        print(all_reviews)
        all_ratings = [rev['rating'] for rev in all_reviews]
        if len(all_ratings)!=0:
            avg_rating = sum(all_ratings)/len(all_ratings)
        else:avg_rating=0
        json={
            "reviews": all_reviews,
            "average_rating": avg_rating
        }
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            favorited_book = db.session.query(FavoriteBooks).filter(
                FavoriteBooks.user_username.like(user_id),
                FavoriteBooks.book_id.like(book_id)
            ).first()

            if favorited_book:
                json["favorited"] = True
            else:
                json["favorited"] = False


        except:
            json["favorited"]="not_logged_in"

        return json, 200

class GetAllBooksWithReviews(Resource):
    def get(self):
        all_books=Reviews.query.all()
        return reviews_schema.dump(all_books),200
    
class DeleteFavorite(Resource):
    @jwt_required()
    def delete(self,book_id):
        
        user_id = get_jwt_identity()
        
        # review=Reviews.query.get((book_id,user_id))
        # db.session.delete(review)
        # db.session.commit()
        stmt=(
            delete(FavoriteBooks).
            where(and_(FavoriteBooks.book_id==book_id,FavoriteBooks.user_username==user_id))
        )
        db.session.execute(stmt)
        db.session.commit()
        return '',200