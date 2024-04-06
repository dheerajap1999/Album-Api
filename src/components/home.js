import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowAltCircleUp, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {deleteAlbumApi, fetchAlbums} from '../redux/reducer/albumReducer'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {

    const dispatch = useDispatch();
    const apiData = useSelector((state)=>state.albumReducer.apiData);
    const status = useSelector((state) => state.albumReducer.status);
    const error = useSelector((state) => state.albumReducer.error);
    const navigate = useNavigate();

    useEffect(()=>{
      dispatch(fetchAlbums());
    },[dispatch])

    function handelDeleteAlbum(e,id){
      e.preventDefault();
      dispatch(deleteAlbumApi(id));
      navigate('/')

    }

    // Check for api status.
    if (status === 'Loading' || status === 'Deleting album...') {
      return <div>
        <h3 className='text-center fw-bold'>{status==='Deleting album...'?'Deleteing album...':'Loading...'}</h3>
        </div>;
    }
  
    if (status === 'Failed') {
      return <div>
        <h3 className='text-center fw-bold'>Error: {error}</h3>
        </div>;
    }
    
    if (status === 'Succeeded' || status === 'Album deleted' ) {
      return (
        <>
        <h1 className='text-center text-underline'>Home Page</h1>
        <div className="constainer m-5">
              <div className="row row-cols-4">
              {apiData.map((album,index)=>{
                return(
                  <div key={index} className="h-20 col card shadow">{album.title}
                  <div className='d-flex justify-content-around'>
                    <Link className="btn btn-info fw-bold mt-4 mb-2" to='/updateAlbum' state={{ albumData: album }}> <FontAwesomeIcon icon={faArrowAltCircleUp} /> Update</Link>
                    <button className="btn btn-danger fw-bold mt-4 mb-2" onClick={(e)=>handelDeleteAlbum(e,album.id)}> <FontAwesomeIcon icon={faTrashCan} /> Delete</button>
                  </div>
                  </div>
                )
                })}
              </div>
        </div>
        <ToastContainer />
        </>
      )
    }
}

export default Home