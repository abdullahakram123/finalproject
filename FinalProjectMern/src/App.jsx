import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/logo.png'
import './App.css'
import Home from './components/home/home'
import Login from './components/login/login'
import { Route, Routes } from 'react-router-dom'
import Sign from './components/signup/sign'
import Dashboard from './components/Dashboard/dashboard'
import Profile from './components/profile/profile'
import User from './components/user/user'
import Plus from './components/plus/plus'
import ProtectedRoutes from "./components/ProtectedRoutes"
import History from './components/history/history'
function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Login />} path='/login' />
        <Route element={<Sign />} path='/sign' />

        <Route
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
          path='/dashboard' />
        <Route
          element={
            <ProtectedRoutes>
              <User />
            </ProtectedRoutes>
          }
          path='/user' />
        <Route element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
          path='/profile' />
        <Route element={
          <ProtectedRoutes>
            <Plus />
          </ProtectedRoutes>
        }
          path='/plus' />
        <Route element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
          path='/home' />
        <Route element={
          <ProtectedRoutes>
            <History />
          </ProtectedRoutes>
        }
          path='/history' />
      </Routes>
    </>
  )
}

export default App
