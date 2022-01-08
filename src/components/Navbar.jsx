import React from 'react'
import { Link } from "react-scroll"
import logo from "../images/logoS1.png"
function Navbar() {
    return (
        <div>
            <nav>
                <Link to="main" className="logo"  smooth={true} duration={1000}>
                    <img src={logo} alt="logo" />
                </Link>
                <input className="menu-btn" type='checkbox' id="menu-btn" />
                <label className="menu-icon" for="menu-btn" >
                    <span className="nav-icon"></span>
                </label>
                <ul className="menu">
                    <li><Link to="main" className='active' smooth={true} duration={500}>Home</Link></li>
                    <li><Link to="features" smooth={true} duration={500}>Our Story</Link></li>
                    <li><Link to="mint" smooth={true} duration={500}>Mint</Link></li>
                    {/* <li><Link to="roadMap" smooth={true} duration={500}>RoadMap</Link></li> */}
                    <li><Link to="team" smooth={true} duration={500}>Team</Link></li>
                    <li><Link to="socials" smooth={true} duration={500}>Socials</Link></li>
                    <li><Link to="roadMap" smooth={true} duration={500}>RoadMap</Link></li>
                    <li><Link to="faq" smooth={true} duration={500}>FAQ</Link></li>

                </ul>
                {/* <Link>address</Link> */}
            </nav>
        </div>
    )
}

export default Navbar
