import React, { useEffect , useState } from 'react';
import AuthAdminComp from '../../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import {BeatLoader} from 'react-spinners'
import "./admin.css"
import { toast } from 'react-toastify';

function UsersList(props){
  let [ar,setAr] = useState([]);

  useEffect(() => {
    doApi()
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async() =>{
    let url = API_URL + "/users/usersList";
    try{
      let resp = await doApiGet(url);
      setAr(resp.data);
    }
    catch(err){
      alert("there problem come back later")
      if(err.response){
        console.log(err.response.data)
      }
    }
  }

  const changeRole = async(_userId,_role) => {
    let url = API_URL + `/users/changeRole/${_userId}/${_role}`;
    try{
      let resp = await doApiMethod(url,"PATCH",{});
      if(resp.data.modifiedCount){
        doApi();
      }
    }
    catch(err){
      if(err.response.status===401){
        toast.error("you can't change yourself or the super admin")
      }
      else{
      toast.error("there problem come back later")
      }
      if(err.response){
        console.log(err.response.data)
      }
    }
  }
 
  return(
    <div className='container'>
      <AuthAdminComp />
      <div style={{ minHeight: "14vh" }}></div>
      <h1 className='gradi text-center'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Users panel</h1>
      <table className='table tableDesign'>
        <thead>
          <tr>
            <th>#</th>
            <th><i className="fa fa-user mx-2" aria-hidden="true"></i>Name</th>
            <th><i className="fa fa-envelope mx-2" aria-hidden="true"></i>Email</th>
            <th><i className="fa fa-map-marker mx-2" aria-hidden="true"></i>Address</th>
            <th><i className="fa fa-user-secret mx-2" aria-hidden="true"></i>Role</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
              <tr key={item._id}>
                <td>{i+1}</td>
                <td>{item._id==="6268023f45f842ebf1ab3dea" ?<span style={{color:"#e91e63"}}> {item.first_name+" "+item.last_name}  (Super Admin)</span>: item.first_name+" "+item.last_name}</td>
                <td>{item.email}</td>
                
                <td>{item.address}</td>
                <td>
                  {(item.role === "admin") ? 
                  <button onClick={() => {
                    changeRole(item._id, "user")
                  }} className='btn btn-outline-danger'>Admin</button> 
                  : 
                  <button 
                  onClick={() => {
                    changeRole(item._id, "admin")
                  }} 
                  className='btn btn-outline-warning'>User</button>
                }
                  </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {ar.length === 0 ?<div className='text-center mt-4'> <BeatLoader/> </div> : ""}
      </div> 
  )
}

export default UsersList;