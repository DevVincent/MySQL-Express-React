import React, {useState, useEffect} from 'react';

import Navigation from './components/navigation/Navigation'
import Home from './components/home/Home'
import AboutMe from './components/home/AboutMe'
import SideDrawer from './components/sidedrawer/SideDrawer'
import Backdrop from './components/backdrop/Backdrop'
import Toolbar from './components/sidedrawer/Toolbar'
import Blog from './components/blog/Blog'
import Contact from './components/contact/Contact'
import AdminLogin from './components/admin/AdminLogin';
import Footer from './components/footer/Footer';

import './App.css';

const App = () => {

  const [isScrolled, setScrolled] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [admOpen, setAdm] = useState(false);
  const [sideDrawerOpen, setSideDrawer] = useState(false);

  const SideDrawerHandler = () => {
    setSideDrawer(prevState => {
      return !prevState;
    });
  }

  const LogginHandler = () => {
    setLogged(prevState => {
      return !prevState;
    });
    
  }

  const ScrollHandler = () => {
    window.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      if(isTop !== true){
        setScrolled(true)
      }else{
        setScrolled(false)
      }
    });
  }

  const AdminButtonHandler = () => {
    setAdm(prevState => {
      return !prevState;
    });
  }

  useEffect(()=>{
    const timeId = setInterval(() => {
      ScrollHandler();
    }, 100)
    return () => clearInterval(timeId);
  });
  
  return (
    <div className="App">
      {isScrolled ? <Toolbar onTouch = {SideDrawerHandler} clicked = {sideDrawerOpen}/> : <div/>}
      {sideDrawerOpen ? <Backdrop/> : <div/>}
      <SideDrawer show = {sideDrawerOpen} onTouch={SideDrawerHandler}/>
      {admOpen ? <AdminLogin show = {admOpen} onTouch={LogginHandler} onLogged={AdminButtonHandler}/> : <div/> } 
      {admOpen ? <Backdrop/> : <div/>}
      <Navigation onTouch = {AdminButtonHandler} />
      <Home/>
      <AboutMe/>
      <Blog logged = {isLogged}/>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
