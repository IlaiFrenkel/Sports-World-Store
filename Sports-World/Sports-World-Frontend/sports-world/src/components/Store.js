import React from 'react';

import Products from "./Products";

import {Link} from "react-router-dom";



const Store = () => {

    return (
        <div>
            <h4>Hello {window.localStorage.getItem('user')}</h4>
            <div>
                <Products/>
            </div>
        </div>
    );
};

export default Store;