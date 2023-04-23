import defaultProfilePic from '../../Assests/profile-default.jpg'
import './DisplayUser.css'

const DisplayUser = ({user}) => {
    return (
        <div className='display-user'>
            <h1 className='username'>{user}</h1>
            <div className='profile-box'>
                <img src={defaultProfilePic} alt={`${user} profile`} />
                <div className='profile-bio'>
                    <h2>A LITTLE ABOUT ME</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Enim praesent elementum facilisis leo vel fringilla.
                        Sed elementum tempus egestas sed sed risus pretium quam. Aliquam faucibus purus in massa tempor nec. Odio ut sem nulla pharetra diam.
                        Sit amet consectetur adipiscing elit pellentesque habitant.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DisplayUser;