import React, { useEffect, useState } from 'react'
import { Route, Routes , Navigate , useNavigate  } from 'react-router-dom'
import Navbar from './Navbar';
import Home from './Home';
import Movies from './Movies';
import Tv from './Tv';
import People from './People';
import Login from './Login';
import Register from './Register';
import Notfound from './Notfound';
import Footer from './Footer';
import jwtDecode from 'jwt-decode';
import MovieDetails from './MovieDetails';
import TvDetails from './TvDetails';


export default function App() {


  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken)
  }


  function logOut() {
    setUserData(null);
    localStorage.removeItem('userToken');
    navigate('/login')
  }

  useEffect(()=>{
    if(localStorage.getItem('userToken')) {
      saveUserData();
    }
  } , [])


  // function(props) {
  //   if(localStorage.getItem('userToken') === null) {
  //     return <Navigate to='/login'/>
  //   }else {
  //     return props.children
  //   }
  // }

  return (
    <>
      <Navbar logOut={logOut} userData={userData}/>
      <div className="container">
      <Routes>
        <Route path=''element={  <Home/> }/>
        <Route path='home' element={ <Home/>  }/>
        <Route path='movies' element={ <Movies/>  }/>
        <Route path='tvShow' element={ <Tv/>  }/>
        <Route path='moviedetails' element={<MovieDetails/>}>
          <Route path=":id" element={<MovieDetails/>} />
        </Route>
        <Route path='tvdetails' element={<TvDetails/>}>
          <Route path=':id' element={<TvDetails />} />
        </Route>
        <Route path='people' element={ <People/> }/>
        <Route path='login' element={  <Login saveUserData={saveUserData}/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
      </div>
      <Footer/>
    </>
  )
}
