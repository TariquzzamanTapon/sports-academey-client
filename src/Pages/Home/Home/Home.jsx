import React from 'react';
import { Helmet } from 'react-helmet-async';
import Carousel from '../Carousel/Carousel';
import PopularClass from '../PopularClass/PopularClass';
import PopularInstructor from '../PopularInstructor/PopularInstructor';
import OurSponsers from '../OurSponsers/OurSponsers';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> Sports Academy</title>
            </Helmet>
            <Carousel></Carousel>
            <PopularClass></PopularClass>
            <PopularInstructor></PopularInstructor>
            <OurSponsers></OurSponsers>
        </div>
    );
};

export default Home;