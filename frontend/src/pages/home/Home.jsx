import React, { useEffect, useState } from 'react'
import Video from '../../components/hero-video/Video'
import Marque from '../../components/marquee/Marque'
import Category from '../../components/category/Category'
import Hero from '../../components/hero/Hero'
import Card from '../../components/product-card/Card'
import Cat from '../../components/CategoryBanner/Cat'
import News from '../../components/NewsSection/News'

import DressCat from '../../pngdress/DressCat'
import { fetchDataFromApi } from '../../utils/api'
import Caraousel from '../../components/Caraousel/Caraousel'
import FilterCat from '../../components/filterCat/FilterCat'

const Home = () => {

  return (
    <>
      <Caraousel/>
      <DressCat /><br />
      {/* <Marque /><br/> */}
      <Hero /><br />
      <Category />
      <FilterCat />
      <Card />
      <Video />
     <News />
    </>
  )
}

export default Home
