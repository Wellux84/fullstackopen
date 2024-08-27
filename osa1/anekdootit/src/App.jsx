import { useState } from 'react'

const Content = ({ anecdote, counter }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>Votes: {counter}</p>
    </div>
  )
}


const App = () => {


  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points, setPoints] = useState(Array(8).fill(0))
  const [selected, setSelected] = useState(0)
  const increaseByOne = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  const mostVotesIndex = points.indexOf(Math.max(...points))

 
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <Content counter={points[selected]} />
      <button onClick={increaseByOne}>Vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>
        Next anecdote
      </button>
      <h2>Anecdote with most votes</h2>
      <Content anecdote={anecdotes[mostVotesIndex]} counter={points[mostVotesIndex]} />
    </div>
  )
}

export default App
