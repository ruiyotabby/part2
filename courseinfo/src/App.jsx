const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
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
    courses.map((course) => (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
    ))
  )
}

const Header = ({course}) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Content = (props) => {
  return (
    props.course.parts.map((el) => (
      <Part key={el.id} course={el} />
    ))
  )
}

const Part = ({course}) => {
  return (
    <p>
      {course.name} {course.exercises}
    </p>
  )
}

const Total = ({course}) => {
  const arr = [];
  course.parts.forEach(element => {
       arr.push(element.exercises)
    })

  const total = arr.reduce((accumulator, currentValue) => accumulator + currentValue);

  return (
    <p>
      <strong>Total of {total} exercises</strong> 
    </p>
  )
}

export default App;