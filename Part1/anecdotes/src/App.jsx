import { useState } from 'react'

const getRandomInt = (min, max)=>{
  min = Math.ceil(min);
  max = Math.floor(max);  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const [bestOne, setbestOne] = useState(0)

  const setSelectedHandler =()=>{
    let random = getRandomInt(0, anecdotes.length-1)
    console.log(random)
    return setSelected(random)
  }

  const updatePointsHandler =()=>{
    const copy = [...points]
    copy[selected]++

    if(copy[selected] > copy[bestOne]){
      setbestOne(selected) 
    }

    console.log(copy)
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>

      <button onClick={updatePointsHandler}>vote</button>
      <button onClick={setSelectedHandler}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[bestOne]}</p>
    </div>
  )
}

export default App