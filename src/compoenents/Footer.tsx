import React from 'react'
import Facebook from "../assets/facebook.svg"
import Instagram from "../assets/instagram.svg"
import twitter from "../assets/twitter.svg"
const Footer: React.FC = () => {
  return (
    <div className='w-[100%] bg-black text-white flex flex-col items-center gap-[10px] p-[1.2rem] md:flex-row md:justify-between md:px-[3.5rem]' >
      <p>
        Copyright Ⓒ 2024 hypergro. All Rights Reserved.
      </p>
      <div className='flex gap-[1rem]'>
        <img src={Facebook} alt="Facebook-logo" />
        <img src={Instagram} alt="Instagram-logo" />
        <img src={twitter} alt="twitter-logo" />
      </div>
    </div>
  )
}

export default Footer