import { Link } from "react-router-dom";

function Footer() {
    return(
        <footer style={{display: "flex", justifyContent: "space-between", backgroundColor: "F87060",padding: "2rem" }}> 
            <div>
                <h5>SafePaws Animal Rescue</h5>
                <img src= "https://via.placeholder.com/150" alt="Logo"  />

            </div>

            <div>  
                <div>
                    <h5>Services</h5>
                    <p>Adopt</p>
                    <p>Volunteer</p>
                    <p>Foster</p>
                </div>
                <div>
                    <h5>More Info</h5>
                    <Link>About Us</Link>
                    <Link>Contact Us</Link>
                </div>
                <div>
                    <h5>Get Connected</h5>
                    <a href="">facebook</a>
                    <a href="">LinkedIn</a>
                    <a href="">Youtube</a>
                    <a href="">Instagram</a>
                </div>
            </div>
            
        </footer>

    )
}

export default Footer;