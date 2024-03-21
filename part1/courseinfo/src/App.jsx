
// Header component takes care of rendering the name of the course
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
} 

// Part component renders the name and number of exercises of one part
const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

// Content component renders the parts and their number of exercises
const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
} 

// Total component renders the total number of exercises
const Total = (props) => {
  return (<p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>)
} 

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App