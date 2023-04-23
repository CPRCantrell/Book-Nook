import NewBoard from "../../components/Home/NewBoard";
import InfoCards from "../../components/Home/InfoCards";
import './HomePage.css'

const HomePage = () => {

  return(
    <main className="home-content">
        <h1>WELCOME TO <span className="book-logo">BOOK</span><span className="nook-logo">NOOK</span></h1>
        <NewBoard />
        <InfoCards />
    </main>
  )
};

export default HomePage;
