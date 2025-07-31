import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";

export default function Animals() {

    return (
        <div>
            <Header/>
            <Nav/>
            <main>
                <h1 className="text-center text-2xl font-bold my-4">Animals</h1>
                <p className="text-center mb-8">Here you can find all the animals available for adoption.</p>
                {/* Add your animal listing component here */}
                
            </main>

            <Footer/>
        </div>
    )
}