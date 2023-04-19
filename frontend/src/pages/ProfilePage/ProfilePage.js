import FavoriteBooks from '../../components/Profile/FavoriteBooks'
import useAuth from '../../hooks/useAuth';

const SearchPage = () => {

    const [user, token] = useAuth()
    const auth = "Bearer " + token;

    return(
        <main>
            <FavoriteBooks auth={auth}/>
        </main>
    )
}

export default SearchPage;