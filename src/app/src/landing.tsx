import Empezamos from "./components/footer/Empezamos";
import Footer from "./components/footer/Footer";
import Landing from "./components/landingPage/Landing";
import Navbar from "./components/navbar/Navbar";


function LandingPage() {
    return(
        <div>
            <Navbar /> 
            <Landing />
            <Empezamos />
            <Footer />
        </div>
    )
}

export default LandingPage;