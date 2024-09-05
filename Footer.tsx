// import React from 'react';
// import './CSS_Files/Footer.css';
// import { FaInstagramSquare } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";
// import { GiPoliceOfficerHead } from "react-icons/gi";
import { FaCcApplePay } from "react-icons/fa6";
import { styled } from '@mui/material/styles';


const Footcont=styled("div")(({theme})=>({
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    // padding:40,
    paddingTop:8,
    backgroundColor:"#F5F5F5",
    gap:90,
    justifyContent:"center",
    borderRadius:5,
    fontFamily:" Arial, Helvetica, sans-serif"

}));

const Footer = () => {
  return (
    <div className='container-2'>
      <Footcont>
      <div className='store'>
        <p><b> STORE</b></p>
        <p>FIND STORE</p>
        <p>SKETCHERS</p>
        <p> CAMP</p>
        <p>SHOPPING </p>
        {/* <a href='https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html' style={{color:"black"}}>Copyrights@2024 APPLE</a> */}
      </div>

      <div className='values'>
        <p><b>VALUES</b></p>
        <p>ACCESSIBILITY</p>
        <p>EDUCATION</p>
        <p>ENVIRONMENT</p>
        <p>PRIVACY</p>
        {/* <a href='https://devasaiportfolio.netlify.app/'  
        style={{color:"black"}}>Founder<GiPoliceOfficerHead />: DEVASAI CHINTHAKUNTLA</a> */}
      </div>

      <div className='Account'>
        <p><b>ADIDAS </b></p>
        <p>ADIDAS ID</p>
        <p>ADIDASSTORE </p>
        <p>WALLET <FaCcApplePay /></p>
        <p>ADIDAS.COM</p>
        {/* <a href='https://www.instagram.com/apple/'  
        style={{color:"black"}} > <FaInstagramSquare /> INSTAGRAM</a> */}
      </div>

      <div className='About'>
        <p><b>ABOUT</b></p>
        <p>NEWSROOM</p>
        <p>LEADERSHIP</p>
        <p>EVENTS</p>
        <p>CONTACT</p>
        {/* <a href='https://www.bing.com/ck/a?!&&p=e90dde57755d626fJmltdHM9MTcyNDI4NDgwMCZpZ3VpZD0xN2NkNzIyYy0xMzFhLTZhNzgtM2E5Yi02NjkzMTI2NTZiMTAmaW5zaWQ9NTIyMA&ptn=3&ver=2&hsh=3&fclid=17cd722c-131a-6a78-3a9b-669312656b10&psq=apple+youtube&u=a1aHR0cHM6Ly93d3cueW91dHViZS5jb20vdXNlci9BcHBsZQ&ntb=1'
         style={{color:"black"}}> <FaYoutube /> YOUTUBE</a> */}
      </div>
        
      </Footcont>
      
      
    </div>
    
    
    

  );
};

export default Footer;
