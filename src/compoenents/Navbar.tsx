import React from 'react'
import LogoSVG from "../assets/app_logo.svg"
const Navbar: React.FC = () => {
    return (
        <div className='w-[100%] bg-black p-[1.2rem] px-[1.8rem] md:px-[3.5rem]'>
            <img src={LogoSVG} alt="Hypergro-logo" className='w-[6rem] md:w-[10rem]' />
        </div>
    )
}

export default Navbar