import { useState } from 'react'

// Button component handles the functionality of each feedback submission button.
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

// StatisticLine component generates a single table row of statistic
const StatisticLine = (props) => {
  return (  
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

// Statistics Component displays all the extracted statistics
const Statistics = (props) => {
    const {good,neutral,bad} = props
    const total = good + neutral + bad

    // No feedback provided
    if (total <= 0)
      return (<p>No feedback given</p>)

    return (
      <div>
        
        <table>
          <tbody>
          <StatisticLine text="good"     value={good}/>
          <StatisticLine text="neutral"  value={neutral}/>
          <StatisticLine text="bad"      value={bad}/>
          <StatisticLine text="all"      value={total}/>
          <StatisticLine text="average"  value={(good-bad)/(total)} />
          <StatisticLine text="positive" value={ (good/(total))*100  + " %"}/>
          </tbody>
        </table>

      </div>
    )
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