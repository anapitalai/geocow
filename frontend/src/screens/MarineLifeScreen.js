import React from 'react'
import { Button, Image } from 'react-bootstrap'
import MarineLifeCarousel from '../components/MarineLifeCarousel'
import FieldTripCarousel from '../components/FieldTripCarousel'
import NOAACarousel from '../components/NOAACarousel'
import MortalityCarousel from '../components/MortalityCarousel'


const MarineLifeScreen = () => {
    return (
        <div>
        
   
           <MarineLifeCarousel />
           <h1>Coral Mortality and Bleaching</h1>
           <p>Some images of coral life and bleaching that were taken on the visited site area.</p>


        </div>
    )
}

export default MarineLifeScreen
