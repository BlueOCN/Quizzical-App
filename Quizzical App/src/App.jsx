
import { useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import he from 'he'
import Question from './components/Question'
import './App.css'

function App() {

  const [quizzing, setQuizzing] = useState(false)
  const [check, setCheck] = useState(false)
  const [allQuestions, setAllQuestions] = useState([])

  useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          .then(res => res.json())
          .then(resData => setAllQuestions(extractQuizz(resData)))
  }, [])

  function shuffleAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  function extractQuizz(apiData) {
    if (apiData === 0) {
      return []
    }
    const questionArray = []
    for (let index = 0; index < apiData.results.length; index++) {
      const r_answer = he.decode(apiData.results[index].correct_answer)
      const w_answers = apiData.results[index].incorrect_answers.map(ans => he.decode(ans))

      questionArray.push({
        id: nanoid(),
        question: he.decode(apiData.results[index].question), 
        answers: shuffleAnswers(w_answers.concat(r_answer))
      })
    }
    return questionArray
  }

  function startQuizzing() {
    setQuizzing(prevQuizzing => !prevQuizzing)
  }

  function checkAnswers() {
    setCheck(prevCheck => ! prevCheck)
  }

  useEffect(() => {
    console.log("All questions changed")
  }, [allQuestions])

  const questionElements = allQuestions.map((q) => (
    <Question 
      key={q.id} 
      query={q.question} 
      shuffledAnswers={q.answers}
    />
  ))

  return (
    <>
      {quizzing ? 
      <main className='quizz'>
        <div className='quizz-container'>
          {questionElements}
        </div>

        <div className='button-container'>
          { check && <h2 className='results'>You scored #/5 correct answers</h2>}
          <button 
            className='quizz-button'
            onClick={checkAnswers}
          >
            {check ? 'Play again' : 'Check answers'}
          </button>
        </div>
        
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
