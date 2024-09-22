import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import PrivateRouter from './PrivateRoute'
import { CgSpinner } from 'react-icons/cg'
import Report from '../pages/Report'
import Login from '../pages/Login'
import NavBar from '../components/NavBar'
import Thanks from '../pages/Thanks'

export const AppRouter = () => {


  return (

    <>
      <BrowserRouter>
        <Suspense fallback={CgSpinner}>
          <NavBar/>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='thanks' element={<Thanks/>}/>
            <Route element={<PrivateRouter />}>
              <Route path='report' element={<Report />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>

      </BrowserRouter>

    </>
  )
}
