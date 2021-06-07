import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedIn, setLoggedIn] = useContext(userContext)
    // let auth = useAuth();
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                     loggedIn.isLoggedIn ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default PrivateRoute;