
import { useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import he from 'he'
import Question from './components/Question'
import './App.css'

function App() {

  const [quizzing, setQuizzing] = useState(false)
  const [check, setCheck] = useState(false)
  const [allQuestions, setAllQuestions] = useState([])
  const [score, setScore] = useState(0)

  /* useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          .then(res => res.json())
          .then(resData => setAllQuestions(extractQuizz(resData)))
  }, [quizzing]) */

  useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
            
            // Check if the response is okay (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const resData = await response.json();
            setAllQuestions(extractQuizz(resData));
        } catch (error) {
            console.error("Error fetching questions:", error);
            // Handle the error, e.g., set an error state or show a message
        }
    };
    fetchQuestions();
  }, [quizzing]);

  function shuffleAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  function extractQuizz(apiData) {

    const questionArray = []
    for (let index = 0; index < apiData.results.length; index++) {
      
      const answersArray = []
      answersArray.push({
        id: nanoid(), 
        text: he.decode(apiData.results[index].correct_answer), 
        style: 0, 
        isSelected: false, 
        isRight: true
      })

      const in_ans = apiData.results[index].incorrect_answers.map(ans =>{
        return (
          {
            id: nanoid(), 
            text: he.decode(ans), 
            style: 0, 
            isSelected: false, 
            isRight: false
          }
        )
      })

      questionArray.push({
        id: nanoid(),
        question: he.decode(apiData.results[index].question), 
        answers: shuffleAnswers(answersArray.concat(in_ans)),
        isCorrect: false
      })
    }
    return questionArray
  }


  function startQuizzing() {
    setScore(0)
    setCheck(false)
    setQuizzing(prevQuizzing => !prevQuizzing)
  }


  /* function checkAnswers() {
    setCheck(prevCheck => !prevCheck)
    setAllQuestions(prevQuestions => prevQuestions.map(prevQuestion => {
      const newAnswers = prevQuestion.answers.map(prevAnswer => {
        // console.log(prevAnswer.isRight, prevAnswer.isSelected)
        if(prevAnswer.isRight){
          // console.log("style 3", prevAnswer.style)
          return ({...prevAnswer, style: 3})
        } else if(prevAnswer.isSelected && prevAnswer.isRight !== prevAnswer.isSelected) {
          // console.log("style 4", prevAnswer.style)
          return ({...prevAnswer, style: 4})
        } else {
          // console.log("style 2", prevAnswer.style)
          return ({...prevAnswer, style: 2})
        }
      })
      // console.log("Q is right?", newAnswers.every((ans)=> ans.isRight === ans.isSelected))
      // const answerState = newAnswers.every((ans)=> ans.isRight === ans.isSelected)
      // console.log("Q is right?", answerState)
      
      return ({...prevQuestion, answers: newAnswers})
    }))
  } */

  const checkAnswers = () => {
    setCheck(prev => !prev);
    setAllQuestions(prevQuestions => {
      var newScore = 0;
      return prevQuestions.map(question => {
        const newAnswers = question.answers.map(answer => {

          if (answer.isRight) {
            if (answer.isSelected) {
              newScore = newScore + 1;
              setScore(newScore % 6);
            }
            return { ...answer, style: 3 }; // Correct answer, highlighted
          }
          return { ...answer, style: answer.isSelected ? 4 : 2 }; // Incorrect or unselected
        });
        return { ...question, answers: newAnswers };
      });
    });
  };


  function selectAnswer(questionId, answerId){
    if(!check){
      setAllQuestions(prevQuestions => prevQuestions.map(prevQuestion => {

        if(prevQuestion.id === questionId){
          const newAnswers = prevQuestion.answers.map((prevAnswer) => {

            if(prevAnswer.id === answerId){
              return ({...prevAnswer, style: 1, isSelected: true})
            }
            else {
              return ({...prevAnswer, style: 0, isSelected: false})
            }
          })

          return ({...prevQuestion, answers: newAnswers})
        }
        return ({...prevQuestion})
      })
    )}
  }

  const questionElements = allQuestions.map((prevQuestion) => (
    <Question 
      key={ prevQuestion.id }
      id={ prevQuestion.id }
      query={ prevQuestion.question } 
      answers={ prevQuestion.answers }
      selectAnswer={ selectAnswer }
    />
  ))

  return (
    <>
      <img className="blob1" src="./Blob1.svg" alt="blob1" />
      <img className="blob2" src="./Blob2.svg" alt="blob2" />

      { quizzing ? 
        <main className='quizz'>
          { check && score===5 && <Confetti />}
          <div className='quizz-container'>
            { questionElements }
          </div>

          <div className='button-container'>
            { check && <h2 className='results'>You scored {score}/5 correct answers</h2> }
            
            { check ?
              <button className='quizz-button' onClick={() => startQuizzing()}>Play again</button>
            :
              <button className='quizz-button' onClick={() => checkAnswers()}>Check answers</button>
            }
          </div>
        </main> 
      : 
        <main className='menu'>
          <h1 className='menu-title'>Quizzical</h1>
          <p className='menu-info'>If you know you know what you know know ...</p>
          <button className='menu-button' onClick={() => startQuizzing()}>Start quiz</button>
        </main>
      }
    </>
  )
}

export default App
