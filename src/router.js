import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';

import Main from './Components/Main/main';

function RouterApp(){
    return(
        <BrowserRouter>
             <Routes>
               <Route path='/' element={<Main/>}/> 
            </Routes>   

        </BrowserRouter>
    )
}

export default RouterApp;