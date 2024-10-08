import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"lotions"} heading={"Top's Lotion's"}/>
      <HorizontalCardProduct category={"toners"} heading={"Popular's toner's"}/>

      {/* <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/> */}
      <VerticalCardProduct category={"lotions"} heading={"Lotions"}/>
      <VerticalCardProduct category={"creams"} heading={"Creams"}/>
      <VerticalCardProduct category={"soaps"} heading={"Soaps"}/>
      <VerticalCardProduct category={"face wash"} heading={"Face wash"}/>
      <VerticalCardProduct category={"toners"} heading={"Toners"}/>
      <VerticalCardProduct category={"sunscreen"} heading={"Sunscreen"}/>
      <VerticalCardProduct category={"body scrub"} heading={"Body Scrub"}/>
      <VerticalCardProduct category={"body oils"} heading={"Body Oils"}/>
      <VerticalCardProduct category={"bodybutter"} heading={"Body Butter"}/>
    </div>
  )
}

export default Home