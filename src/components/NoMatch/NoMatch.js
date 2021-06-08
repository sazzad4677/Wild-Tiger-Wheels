import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';


const NoMatch = () => {
    return (
        <div>
            <Header/>
            <section className="main-div">
                <div className="text-center">
                    <div>
                        <h1 className="text-danger">404</h1>
                        <h2 className="text-danger">Error - Sorry Something Went Wrong !</h2>
                    </div>
                    <p className="text-danger">For Some Reason The Page You Requested Could Not Be Found On Our Server</p>
                </div>
                <p className="text-center"> <Link to="/home">Go Home</Link></p>
            </section>
        </div>
    );
};

export default NoMatch;