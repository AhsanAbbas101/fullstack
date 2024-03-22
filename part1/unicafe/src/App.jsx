import { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Display = (props) => {
  return (
    <p> {props.category + " " + props.count}</p>
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
        <Display category="good" count={good}/>
        <Display category="neutral" count={neutral}/>
        <Display category="bad" count={bad}/>
        <Display category="all" count={good+neutral+bad}/>
        <Display category="average" count={(good-bad)/(good+neutral+bad)} />
        <Display category="positive" count={good/(good+neutral+bad)  + " %"}/>
      </div>
    </div>
  )
}

export default App