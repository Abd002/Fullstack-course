const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

 console.log("Work")

  return (
    <div>
      <Header course={course.name} />

      <Content data={course.parts} />

      <Total Total={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part  part={props.data[0]}></Part >
      <Part  part={props.data[1]}></Part >
      <Part  part={props.data[2]}></Part >
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.Total}</p>
    </>
  )
}

const Part=(props)=>{
  return (
    <>
    <p>
        {props.part.name} {props.part.exercises}
    </p>
    </>
  )
}

export default App