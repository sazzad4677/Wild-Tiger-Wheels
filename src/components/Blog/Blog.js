import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import NoMatch from '../NoMatch/NoMatch';

const Blog = () => {
    return (
        <div>
            <Header></Header>
            <NoMatch></NoMatch>
        </div>
    );
};

export default Blog;