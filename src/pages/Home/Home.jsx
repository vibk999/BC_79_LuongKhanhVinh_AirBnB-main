import React from 'react'
import CarouselSearch from './components/CarouselSearch/CarouselSearch'
import Room from './components/Room/Room'

export default function Home() {
  return (
    <div>
      <div className="h-28"></div>
      <div className='container mx-auto'>
        <CarouselSearch />
      </div>
      <div className='container mx-auto mt-10'>
        <Room />
      </div>
    </div>
  )
}
