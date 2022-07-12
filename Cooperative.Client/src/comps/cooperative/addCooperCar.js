import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthClientComp from '../users_comps/authClientComp';
import { API_URL, doApiMethod } from '../../services/apiService';
import axios from "axios";
import { secret } from '../../config/config';

function AddCooperCar(props){
    let [year, setYear] = useState([]);
  let nav = useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let addressRef = register("address", { required: true, minLength: 2, maxLength: 150 })
  let infoRef = register("info", { required: true, minLength: 2, maxLength: 500 })
  let yearRef = register("year", { required: true, minLength: 2, maxLength: 500 })
  let priceRef = register("day_price", { required: true, min: 1, max: 999999 })
  let img_urlRef = register("img_url", { required: false, minLength: 3, maxLength: 500 })
  let [btnSend,setBtnSend] = useState(false)

  useEffect(() => {
    doYear()
  }, [])

  const doYear = () => { 
    let yearsar=[];
    let counter=0;
    for (let i =1980; i <2023; i++) {
      yearsar[counter] = i;
      counter++;
  } 
  setYear(yearsar)
  }

  const onSubForm = (formData) => {
    setBtnSend(true);
    doLocation(formData)
  }

  const doLocation = async (formData) => { 
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formData.address}&key=${secret.googleKey}`
    let resp = await axios.get(url);
    let data = resp.data.results[0].geometry.location
        formData.longitude =data.lat
        formData.attitude =data.lng
        doFormApi(formData);        
  }

  const doFormApi = async (formData) => {
    let url = API_URL + "/cooperative";
    try {
      let resp = await doApiMethod(url, "POST", formData);
      if (resp.data._id) {
        toast.success("Car added");
        nav(-1)
      }
    }  
    catch (err) {
      console.log(err.response);
      alert("There problem try again later")
    }
  }

  return (
    <div className='container mb-5'>
      <AuthClientComp />
<div style={{ minHeight: "15vh" }}></div>
      {
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-7 p-3 shadow mx-auto form-design text-dark'>
              <h1 className='mb-4 gradi text-center '><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Cooperative Car</h1>
        <label className="my-2"><i className="fa fa-american-sign-language-interpreting mx-2" aria-hidden="true"></i>Car Name</label>
        <input {...nameRef} type="text" className='form-control' placeholder='type name...'/>
        {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 150 chars</small> : ""}

        <label className="my-2"><i className="fa fa-location-arrow mx-2" aria-hidden="true"></i>Full Adress (city, street, number)</label>
        <input {...addressRef} type="text" className='form-control' placeholder='type address...'/>
        {errors.address ? <small className='text-danger d-block'>* Enter valid address 2 to 150 chars</small> : ""}

        <label className="my-2"><i className="fa fa-info mx-2" aria-hidden="true"></i>Information</label>
        <textarea {...infoRef} className='form-control' rows="3" placeholder='type informatiom about the car...'></textarea>
        {errors.info ? <small className='text-danger d-block'>* Enter valid info, 3 to 500 chars</small> : ""}

        <label className='my-2'><i className="fa fa-money mx-2" aria-hidden="true"></i>Price for 1 hour</label>
        <input {...priceRef} type="number"  className='form-control' placeholder='type price...'/>
        {errors.price ? <small className='text-danger d-block'>* Enter valid  price, between 1 to 999999</small> : ""}

        <label className="my-2"><i className="fa fa-angle-double-right mx-2" aria-hidden="true"></i>Year</label>
        <select {...yearRef}  className='form-select'>
         <option  value="" >Choose Year</option>
         {year.map((i) => {
            return (
              <option key={i} value={i}>{i}</option>
            )
          })}
        </select>
        {errors.year ? <small className='text-danger d-block'>* Enter valid  year</small> : ""}

       
        <label className="my-2"><i className="fa fa-picture-o mx-2" aria-hidden="true"></i>Image url</label>
        <input {...img_urlRef} type="text" className='form-control mb-4' placeholder='type url of image car...'/>
        {errors.img_url ? <small className='text-danger d-block'>* Enter valid  img url </small> : ""}
          <div className='text-center mt-4'>
        <button className='btn btn-outline-success me-2' disabled={btnSend}>Add<i className="fa fa-plus mx-2" aria-hidden="true"></i></button>
        <Link className='btn btn-outline-danger' to="/cooperative">Cancel</Link>
        </div>
      </form>}
    </div>
  )
}
export default AddCooperCar