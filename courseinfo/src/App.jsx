const App = () => {
  const course = {
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
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return (
    props.course.parts.map((el) => (
      <Part name={el.name} exercise={el.exercises} />
    ))
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  )
}

const Total = (props) => {
  const arr = [];
  props.course.parts.forEach(element => {
       arr.push(element.exercises)
    })

    const total = arr.reduce((accumulator, currentValue) => accumulator + currentValue);

  return (
    <p>
      Number of exercises: {total}
    </p>
  )
}

export default App;