import  Axios  from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Register() {

  const [errorList, setErrorList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate()

  const [error, setError] = useState('')
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age:0,
    email:'',
    password:''
  })

  function getUserData(e){
    let myUser = {...user}; // Deep Copy From user
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  }

  async function submitRegisterForm(e) {
    e.preventDefault();
    setIsLoading(true);

    let validationResult = validateRegisterForm();
    if(validationResult.error) {
      setErrorList(validationResult.error.details);
      setIsLoading(false)
    }
    else {
      let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signup', user);
    if(data.message === 'success') // Registration Done
    {
      navigate('/login')
      setIsLoading(false)
    }
    else {
      setError(data.message)
      setIsLoading(false)
    }
    }

    
  }


  function validateRegisterForm() {
    let schema = Joi.object({
      first_name:Joi.string().alphanum().min(3).max(10).required(),
      last_name:Joi.string().alphanum().min(3).max(10).required(),
      age:Joi.number().min(16).max(80).required(),
      email:Joi.string().email({ minDomainSegments: 2,tlds: [true] }).required(),
      password:Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,10}$')).required(),
    });

    return schema.validate(user , {abortEarly:false});
  }

  return (
    <>
    <div className='w-75 mx-auto'>
      <h2 className='my-3 py-3'>Registeration Form</h2>
      {/* {errorList.map((error, index)=><div className=" alert text-danger">{error.message}</div>)} */}
      {error ? <div className="alert alert-danger">{error}</div>: ''}
      
      <form onSubmit={submitRegisterForm}>
        <label htmlFor="first_name">firstName:</label>
        <input onChange={getUserData} className='form-control mb-2'  name="first_name" id="first_name" />
        {errorList.map((error , index)=> {
          if(error.message.includes("first_name")) {
            return (
              <p className='alert text-danger'>FirstName Not Valid</p>
            )
          }
        })}
        
        <label htmlFor="last_name">lastName:</label>
        <input onChange={getUserData} className='form-control mb-2'  name="last_name" id="last_name" />
        {errorList.map((error , index)=> {
          if(error.message.includes("last_name")) {
            return (
              <p className='alert text-danger'>LastName Not Valid</p>
            )
          }
        })}
        
        <label htmlFor="age">Age:</label>
        <input onChange={getUserData} className='form-control mb-2' type="number" name="age" id="age" />
        {errorList.map((error , index)=> {
          if(error.message.includes("age")) {
            return (
              <p className='alert text-danger'>{error.message}</p>
            )
          }
        })}
        
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
              <p className='alert text-danger'>Password Not Valid</p>
            )
          }
        })}

        <button className='btn btn-primary ms-auto mt-4 d-flex' type='submit'>
          {isLoading=== true? <i className='fas fa-spinner fa-spin'></i>:'Register'}
          
        </button>
      </form>
    </div>
    </>
  )
}
