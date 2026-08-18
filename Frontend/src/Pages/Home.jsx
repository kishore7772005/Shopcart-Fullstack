import React from 'react'
import MyNavbar from '../Components/HomeComponents/Navbar'
import Carosel from '../Components/HomeComponents/Carosel'
import Categories from '../Components/HomeComponents/Categories'
import Deal from '../Components/HomeComponents/Deal'
import Brand from '../Components/HomeComponents/Brand'
import Offer from '../Components/HomeComponents/Offer'
import PopularProduct from '../Components/HomeComponents/PopularProduct'
import BestProduct from '../Components/HomeComponents/BestProduct'
import SellingProduct from '../Components/HomeComponents/SellingProduct'
import Trending from '../Components/HomeComponents/Trending'
import BestSellingImages from '../Components/HomeComponents/BestSellingImages'
import Service from '../Components/HomeComponents/Service'
import Footer from '../Components/HomeComponents/Footer'


const Home = () => {
  return (
    <>
      <MyNavbar />
      <Carosel />
      <Categories/>
      <Deal/>
      <Brand/>
      <Offer/>
      <PopularProduct/>
      <BestProduct/>
      <SellingProduct/>
      <Trending/>
      <BestSellingImages/>
      <Service/>
      <Footer/>
      
      
    </>
  )
}

export default Home 