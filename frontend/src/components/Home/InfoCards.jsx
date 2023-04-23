import './InfoCards.css'

const InfoCards = () => {
    return (
        <div className='parent-container'>
            <div className='info-cards'>
                <div className={'info-card left'}>
                    <h3>Search</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className='info-card middle-card'>
                    <div className='middle'>
                        <h3>Explore</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
                <div className={'info-card right'}>
                    <h3>Read</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        </div>
    );
}

export default InfoCards;