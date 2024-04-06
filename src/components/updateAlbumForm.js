import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateAlbumState } from '../redux/reducer/albumReducer';

function UpdateAlbumForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {state} = useLocation();
    const [updateName, setUpdateName] = useState(state.albumData.title);
    
    
    const payload = {
        userId:state.albumData.userId,
        id:state.albumData.id,
        title:updateName
    }

    function handelUpdate(e){
        e.preventDefault();
        dispatch(updateAlbumState(payload))
        toast.success("Album updated",{autoClose:2000})
        setTimeout(() => {
          navigate('/')
        }, 2500);
    }
  return (
    <>
    <h1 className='text-center m-5'>Update Album</h1>
    <div className="container d-flex justify-content-center">
        <form className="row g-3 text-center" onSubmit={(e)=>handelUpdate(e)}>
              <div className="col-auto">
                <label htmlFor="createAlbum" className="visually-hidden">ALbum Name</label>
                <input type="text" className="form-control" value={updateName} onChange={(e)=>setUpdateName(e.target.value)} name="albumName"  id="UpdateAlbum" placeholder="enter the updated name..." />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary fw-bold mb-3">Update</button>
              </div>
        </form>
    </div>
        <ToastContainer />
    </>
  )
}

export default UpdateAlbumForm