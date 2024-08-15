
import { useState } from 'react'
import './App.css'

function App() {
  const [quizzing, setQuizzing] = useState(false)

  function startQuizzing() {
    setQuizzing(prevQuizzing => !prevQuizzing)
  }

  return (
    <>
      {quizzing ? 
      <main className='quizz'>
        <div className='quizz-container'>
          <div className='question-container'>
            <h1 className='question'>How would one say goodbye in Spanish?</h1>
            <p>answers</p>
            <br />
          </div>
          <br />
          <div className='question-container'>
            <h1>Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?</h1>
            <p>answers</p>
            <br />
          </div>
          <div className='question-container'>
            <h1>What is the hottest planet in our Solar System?</h1>
            <p>answers</p>
            <br />
          </div>
          <div className='question-container'>
            <h1>In which country was the caesar salad invented?</h1>
            <p>answers</p>
            <br className='asd'/>
          </div>
          <div className='question-container'>
            <h1>How Many Hearts Does An Octopus Have?</h1>
            <p>answers</p>
            <br />
          </div>
        </div>
        <button className='quizz-button'>Check answers</button>
      </main> 
      : 
      <main className='menu'>
        <h1 className='menu-title'>Quizzical</h1>
        <p className='menu-info'>Some description if needed</p>
        <button className='menu-button' onClick={startQuizzing}>Start quiz</button>
      </main>
      }
    </>
  )
}

export default App
