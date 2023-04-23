import FavoriteBooks from '../../components/Profile/FavoriteBooks'
import DisplayUser from '../../components/Profile/DisplayUser';
import PersonalReviewes from '../../components/Profile/PersonalReviews';
import useAuth from '../../hooks/useAuth';
import './ProfilePage.css'

const SearchPage = () => {

    const [user, token] = useAuth()
    const auth = "Bearer " + token;

    return(
        <main className='profile-content'>
            <DisplayUser user={user.username}/>
            <FavoriteBooks auth={auth}/>
            <PersonalReviewes auth={auth}/>
        </main>
    )
}

export default SearchPage;