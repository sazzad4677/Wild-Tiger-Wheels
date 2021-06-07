import React from 'react';
import Header from '../Header/Header';
import VehicleList from '../VehicleList/VehicleList';
import "./Home.css"

const Home = () => {
    return (
        <div className="home-bg">
            <Header />
            <VehicleList />
        </div>
    );
};

export default Home;