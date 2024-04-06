import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAlbum } from '../redux/reducer/albumReducer';
import { useNavigate } from 'react-router-dom';

function CreateAlbumForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [albumName, setAlbumName] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(albumName.trim() !== ''){
            dispatch(createAlbum(albumName));
            setAlbumName('');
            toast.success(`Album ${albumName} created successfully!`,{autoClose: 2000})
            setTimeout(() => {
              navigate('/')
            }, 2500);
        }
    }
  return (
    <>
    <h1 className='text-center m-5'>Create Album</h1>
    <div className="container d-flex justify-content-center">
        <form className="row g-3 text-center" onSubmit={(e)=>handleSubmit(e)} >
              <div className="col-auto">
                <label htmlFor="createAlbum" className="visually-hidden">ALbum Name</label>
                <input type="text" className="form-control" value={albumName} onChange={(e)=>setAlbumName(e.target.value)} name="albumName"  id="createAlbum" placeholder="enter the album name..." />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary fw-bold mb-3">Create</button>
              </div>
        </form>
    </div>
        <ToastContainer />
    </>
  )
}

export default CreateAlbumForm