import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PlaygroundPage from './pages/PlaygroundPage'
import ChallengePage from './pages/ChallengePage'
import About from './pages/About'
import TutorialScene from './scenes/TutorialScene'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/playground" element={<PlaygroundPage />} />
      <Route path="/challenges" element={<ChallengePage />} />
      <Route path="/tutorial" element={<TutorialScene />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default AppRouter
