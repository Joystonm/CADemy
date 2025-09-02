import React from 'react'
import Toolbar from '../components/Toolbar'
import Playground from '../scenes/Playground'

const PlaygroundPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      <div className="flex-1">
        <Playground />
      </div>
    </div>
  )
}

export default PlaygroundPage
