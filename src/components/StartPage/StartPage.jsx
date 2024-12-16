import NavBar from "./NavBar";
import Header from "./Header";
import About from "./About";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Contact from "./Contact";
import Benefits from "./Benefits";
import Footer from "./Footer";

export default function StartPage() {
  return (
    <>
      <NavBar></NavBar>
      <Header></Header>
      <About></About>
      <HowItWorks></HowItWorks>
      <Benefits></Benefits>
      {/* <Features></Features> */}
      <Contact></Contact>
      <Footer></Footer>
    </>
  )
}
