
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

function Home() {
    
  return (
    <div>
      <Header/>
      <div>
        <nav class= "space-x-20">
            <Link>Meet Your Future Friends!</Link>
            <Link>Applications</Link>
            <Link>About Us!</Link>
            <Link>Login/Register</Link>
            
        </nav>
      </div>
      <div>
        <img src="https://images.squarespace-cdn.com/content/v1/66ec3b49803ab81bf84f89e4/1726789423907-OMC6SOD7GIZ2NLNGMGM9/house-cat-lying-on-floor-8529064-scaled.jpg?format=2500w" alt="Main Image" />
      </div>

      {/* featured pet space */}
      <h2>Feature Pets</h2>
      <div class= "flex justify-center space-x-12">
        <img src="https://www.battersea.org.uk/sites/default/files/animal_images/068Nz00000TRyslIAD.webp" alt="Pet 1" class= "w-64"/>
        <img src="https://www.battersea.org.uk/sites/default/files/animal_images/068Nz00000TS2W7IAL.webp" alt="Pet 2" class="w-64" />
        <img src="https://www.battersea.org.uk/sites/default/files/animal_images/068Nz00000U9GfNIAV-thumb.webp?id=63463.0717202510449030052" alt="Pet 3" class="w-64" />
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
