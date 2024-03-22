import { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <p> {props.text + " " + props.value}</p>
  )
}

const Statistics = (props) => {
    const {good,neutral,bad} = props
    const total = good + neutral + bad

    if( total > 0)
    {
      return (
        <div>
          <StatisticLine text="good"     value={good}/>
          <StatisticLine text="neutral"  value={neutral}/>
          <StatisticLine text="bad"      value={bad}/>
          <StatisticLine text="all"      value={total}/>
          <StatisticLine text="average"  value={(good-bad)/(total)} />
          <StatisticLine text="positive" value={good/(total)  + " %"}/>
        </div>
      )
    }
    
    return (<p>No feedback given</p>)

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button text="good" onClick={()=> setGood(good+1)}/>
        <Button text="neutral" onClick={()=> setNeutral(neutral+1)}/>
        <Button text="bad" onClick={()=> setBad(bad+1)}/>
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App