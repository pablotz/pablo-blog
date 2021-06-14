import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaBars, FaHome, FaFacebook, FaComment, FaTwitter, FaEnvelope, FaTimes } from "react-icons/fa";

import ProgressBar from "react-scroll-progress-bar";

const NavBar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <div>
      <ProgressBar
    bgcolor="#94a7c9"
    height="5px" />
    <nav className="navbar">
      
      <div className="nav-container">
        <a className="nav-logo">Hernández Contreras
        <i className="fas fa-code"></i>
        </a>


        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a className="nav-links" onClick={handleClick}>
              <i className="nav-link-icon"><FaHome /></i>Home
        </a>
          </li>
          <li className="nav-item">
            <a className="nav-links" onClick={handleClick}>
            <i className="nav-link-icon"> <FaComment /></i>Blog</a>
          </li>
          <li className="nav-item">
            <a className="nav-links"
              onClick={handleClick}>
                 <i className="nav-link-icon"><FaFacebook /></i>Facebook</a>
          </li>
          <li className="nav-item">
            <a className="nav-links"
              onClick={handleClick}> <i className="nav-link-icon"><FaTwitter /></i> Twitter</a>
          </li>
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
    </div>



  )
}

export default NavBar
