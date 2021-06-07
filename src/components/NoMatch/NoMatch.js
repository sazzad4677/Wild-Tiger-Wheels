import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
    return (
        <div>
            <section>
                <di className="text-center">
                    <div>
                        <h1>404</h1>
                        <h2>Error - Sorry Something Went Wrong !</h2>
                    </div>
                    <p>For Some Reason The Page You Requested Could Not Be Found On Our Server</p>
                </di>
                <p className="text-center"> <Link to="/home">Go Home</Link></p>
            </section>
        </div>
    );
};

export default NoMatch;