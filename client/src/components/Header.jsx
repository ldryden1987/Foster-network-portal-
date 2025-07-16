import { Link } from "react-router-dom";


function Header() {
    return(
        <header style={{display: "flex", justifyContent: "space-between", padding: "1rem", backgroundColor: "102542", alignItems: "center"}}> 
          <img src="https://via.placeholder.com/150" alt="Company Logo"  />
            <h1>Safe Paws Animal Rescue</h1>
            <nav style={{display: "flex", gap: "1rem"}}>
                <Link to="/">Home</Link>
                <Link>Adopt</Link>
                <Link>foster</Link>
                <Link>Volunteer</Link>
            </nav>
            <div>
                <p>Join our mission to help pets find homes</p>
                <button style={{padding: "0.5rem 1 rem"}}>Donate</button>
            </div>
        </header>

    )
}

export default Header;