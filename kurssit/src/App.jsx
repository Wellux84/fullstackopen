import { useState } from 'react'
import Course from './components/Course'

const App = ({ courses }) => {
  return (
    <div>
      <ul>
        {courses.map(course => 
          <Course key={course.id} course={course} />
        )}

      </ul>
    </div>
  )
}

export default App
