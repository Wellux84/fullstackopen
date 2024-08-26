import { useState } from 'react'
const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <h2>{props.ctext}</h2>
    </div>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ value, text }) => <div>{text} {value}</div>
const Statistics = (props) => {


  if (props.allClicks.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
      <tr>
        <td><StatisticLine text="good" value ={props.good} /></td>
      </tr>
      <tr>
        <td><StatisticLine text="neutral" value ={props.neutral} /></td>
      </tr>
      <tr>
        <td><StatisticLine text="bad" value ={props.bad} /></td>
      </tr>
      <tr>
        <td><StatisticLine text="all" value ={props.allClicks.length}/></td>
      </tr>
      <tr>
        <td><StatisticLine text="avarage" value ={props.avarag} /></td>
      </tr>
      <tr>
        <td><StatisticLine text="positive" value ={props.posit} /></td>
      </tr>
      </tbody>
      </table>
  )
}

const App = () => {
  const header = 'give geedback'
  const ctext = 'statistic'
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const avarag = (good - bad)/allClicks.length
  const posit = good/allClicks.length *100

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }



  return (
    <div>
      <Header header={header}/>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Content ctext={ctext} />
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} avarag={avarag} posit={posit}/>
      </div>
  )
}

export default App
