import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Videoplayer from './Videoplayer'

const AllRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/video:/id' element={<Videoplayer />} />
        </Routes>
    )
}

export default AllRoutes