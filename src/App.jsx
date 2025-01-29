const Card = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  )
}


const App = () => {
  return(
    <>
    <h2>Functional Arrow Component</h2>
    <Card title="Dangal" />
    <Card title = "Sultan" />
    <Card title = "Krishh" />

    </>
  )
}

export default App
