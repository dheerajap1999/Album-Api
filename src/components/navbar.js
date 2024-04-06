import React from 'react'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faImages, faHome, faImage} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet } from 'react-router-dom';
function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand fw-bold" href="/"> <FontAwesomeIcon icon={faImages}/> Albums Application</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className=" d-flex justify-content-end">
                <NavLink className={'btn btn-outline-primary fw-bold me-4'}  to="/"> Home <FontAwesomeIcon icon={faHome} /></NavLink>
                {/* <NavLink className={'btn btn-outline-primary fw-bold me-4'} to="/Albums">Albums <FontAwesomeIcon icon={faImagePortrait} /> </NavLink> */}
                <NavLink className={'btn btn-outline-primary fw-bold me-4'} to="/createAlbum">Create Album <FontAwesomeIcon icon={faImage} /> </NavLink>
            </div>
        </div>
    </nav>
    < Outlet/>
    </>
  )
}

export default Navbar