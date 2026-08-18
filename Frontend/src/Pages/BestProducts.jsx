import React from 'react'
import MyNavbar from '../Components/HomeComponents/Navbar'
import BestProductsIntro from '../Components/BestProductsComponents/BestProductsIntro'
import BestProduct from '../Components/HomeComponents/BestProduct'
import Footer from '../Components/HomeComponents/Footer'
import BestSellingImages from '../Components/HomeComponents/BestSellingImages'
import Offer from '../Components/HomeComponents/Offer'
import Products from '../Components/BestProductsComponents/Products'
import ProductCircle from '../Components/BestProductsComponents/ProductCircle'



const BestProducts = () => {
  return (
    <>
      <MyNavbar />
      <ProductCircle/>
      <BestProductsIntro />
     
      <Products/>
       <BestSellingImages/>
      <Offer/>
      
      <Footer />
    </>
  )
}

export default BestProducts
