import React from 'react'
import Facebook from "../assets/facebook.svg"
import Instagram from "../assets/instagram.svg"
import twitter from "../assets/twitter.svg"
const Footer: React.FC = () => {
  return (
    <div className="w-[100%] bg-black flex flex-col items-center mt-[20px]">
      <hr className="w-[95%] border-gray-400 my-4"/>
      <div className="w-[95%] text-white flex flex-col items-center gap-[10px] p-[1.2rem] md:flex-row md:justify-between" >
        <p className="text-[0.9rem] md:text-[1.1rem]">
          Copyright Ⓒ 2024 hypergro. All Rights Reserved.
        </p>
        <div className='flex gap-[1rem]'>
          <img src={Facebook} alt="Facebook-logo" />
          <img src={Instagram} alt="Instagram-logo" />
          <img src={twitter} alt="twitter-logo" />
        </div>
      </div>
    </div>
  )
}

export default Footer