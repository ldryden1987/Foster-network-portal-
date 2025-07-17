
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

function Home() {
    
  return (
    <div>
      <Header/>
      <div>
        <nav>
            <Link>Meet Your Future Friends!</Link>
            <Link>Applications</Link>
            <Link>About Us!</Link>
            <Link to='/signin'>Login/Register</Link>
            
        </nav>
      </div>
      <div>
        <img src="https://via.placeholder.com/600x300" alt="Main Image" />
      </div>

      {/* featured pet space */}
      <h2>Feature Pets</h2>
      <div>
        <img src="https://via.placeholder.com/150" alt="Pet 1" />
        <img src="https://via.placeholder.com/150" alt="Pet 2" />
        <img src="https://via.placeholder.com/150" alt="Pet 3" />
      </div>

      {/* Button */}
      <div>
        <button>Click here to view all our available pets</button>
      </div>

      {/* Welcome section */}
      <h3>Welcome</h3>

      <Footer />
    </div>
  );
}

export default Home;
