import  Axios  from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login(props) {

  const [errorList, setErrorList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate()

  const [error, setError] = useState('')
  const [user, setUser] = useState({
    email:'',
    password:''
  })

  function getUserData(e){
    let myUser = {...user}; // Deep Copy From user
    myUser[e.target.name] = e.target.value;
    
    setUser(myUser)
  }

  async function submitLoginForm(e) {
    e.preventDefault();
    setIsLoading(true);

    let validationResult = validateLoginForm();
    if(validationResult.error) {
      setErrorList(validationResult.error.details);
      setIsLoading(false)
    }
    else {
      let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signin', user);
    if(data.message === 'success') // Registration Done
    {
      setIsLoading(false)
      localStorage.setItem('userToken', data.token);
      props.saveUserData();
      navigate('/home')
    }
    else {
      setError(data.message)
      setIsLoading(false)
    }
    }

    
  }


  function validateLoginForm() {
    let schema = Joi.object({
      email:Joi.string().email({ minDomainSegments: 2,tlds: [true] }).required(),
      password:Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,10}$')).required(),
    });

    return schema.validate(user , {abortEarly:false});
  }

  return (
    <>
    <div className='w-75 mx-auto'>
      <h2 className='my-3 py-3'>Login Form</h2>
      {/* {errorList.map((error, index)=><div className=" alert text-danger">{error.message}</div>)} */}
      {error ? <div className="alert alert-danger">{error}</div>: ''}
      
      <form onSubmit={submitLoginForm}>
        
        <label htmlFor="email">email :</label>
        <input onChange={getUserData} className='form-control mb-2' type="email" name="email" id="email" />
        {errorList.map((error , index)=> {
          if(error.message.includes("email")) {
            return (
              <p className='alert text-danger'>email Not Valid</p>
            )
          }
        })}
        
        <label htmlFor="password">Password :</label>
        <input onChange={getUserData} className='form-control mb-2'type="password"  name="password" id="password" />
        {errorList.map((error , index)=> {
          if(error.message.includes("password")) {
            return (
              <p className='alert text-danger'>Paswword Not Valid</p>
            )
          }
        })}

        <button className='btn btn-primary ms-auto mt-4 d-flex' type='submit'>
          {isLoading=== true? <i className='fas fa-spinner fa-spin'></i>:'Login'}
          
        </button>
      </form>
    </div>
    </>
  )
}
