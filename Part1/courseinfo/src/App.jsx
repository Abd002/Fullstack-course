const App = () => {
  const course = 'Half Stack application development'

  const data = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ]

 console.log("Work")

  return (
    <div>
      <Header course={course} />

      <Content data={data} />

      <Total Total={data[0].exercises+data[1].exercises+data[2].exercises} />
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
      <Part  name={props.data[0].name} exercises={props.data[0].exercises}></Part >
      <Part  name={props.data[1].name} exercises={props.data[1].exercises}></Part >
      <Part  name={props.data[2].name} exercises={props.data[2].exercises}></Part >
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
        {props.name} {props.exercises}
    </p>
    </>
  )
}

export default App