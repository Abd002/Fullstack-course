import { useState } from 'react'


const Statistics = ({good, neutral, bad}) => {
  let sum = good+neutral+bad;
  if(sum == 0){
    return (
      <p>No feedback given</p>
    )
  }else {
    return (
      <>
        <table> 
          <tbody>
            <StatisticLine text='good' value={good}></StatisticLine>
            <StatisticLine text='neutral' value={neutral}></StatisticLine>
            <StatisticLine text='bad' value={bad}></StatisticLine>

            <StatisticLine text='all' value={sum}></StatisticLine>
            <StatisticLine text='average' value={(good-bad)/(sum)}></StatisticLine>
            <StatisticLine text='positive' value={(good/(sum))*100.0}></StatisticLine>
          </tbody>
        </table>
      </>
    )
  }
}

const StatisticLine =({text, value})=>{
  if(text == 'positive'){
    return (
      <>
        <tr>
          <td>{text}</td>
          <td>{value} %</td>
        </tr>
      </>
    )
  }else {
    return (
      <>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </>
    )
  }
}

const Button=({handleEvent, text})=>{
  return (
    <button  onClick={handleEvent}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>

      <Button  handleEvent={()=> setGood(good + 1)} text='good'></Button>
      <Button  handleEvent={()=> setNeutral(neutral + 1)} text='neutral'></Button>
      <Button  handleEvent={()=> setBad(bad + 1)} text='bad'></Button>

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} ></Statistics>
    </div>
  )
}


export default App