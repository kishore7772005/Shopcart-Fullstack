import React from 'react'
import MyNavbar from '../Components/HomeComponents/Navbar'
import DealsIntro from '../Components/DealsComponents/DealsIntro'
import Deal from '../Components/HomeComponents/Deal'
import Footer from '../Components/HomeComponents/Footer'
import SellingProduct from '../Components/HomeComponents/SellingProduct'


const Deals = () => {
  return (
    <>
      <MyNavbar />
      <DealsIntro />
      <Deal />
      <SellingProduct/>
      
      <Footer />
    </>
  )
}

export default Deals
