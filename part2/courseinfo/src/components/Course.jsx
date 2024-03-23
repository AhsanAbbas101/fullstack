const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
const total =  parts.reduce((s,p) => s+p.exercises,0)
return <p><b>total of {total} exercises</b></p>
}

const Part = ({ part }) => 
<p>
    {part.name} {part.exercises}
</p>

const Content = ({ parts }) => 
    parts.map(part => <Part key={part.id} part={part}/>)
  

export default Course