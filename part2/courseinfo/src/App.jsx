const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
    <h1>Web development curriculum</h1>
    {courses.map((value, i)=>
      <Course course={value} key={i} />
    )}  
  </>
  )
}


const Course =({course})=>{
  return (
    <div>
      <Header course={course.name} />

      <Content data={course.parts} />

      <Total course={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h2>{props.course}</h2>
    </>
  )
}

const Content = ({data}) => {
  return (
    <>
      {data.map((value, i) => 
        <Part part={value} key={i}></Part>
      )}
    </>
  )
}

const Total = ({course}) => {
  let sum = course.reduce((s, p)=>s+p.exercises, 0)

  console.log(sum)

  return (
    <>
      <h4>total of {sum} exercises</h4>
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