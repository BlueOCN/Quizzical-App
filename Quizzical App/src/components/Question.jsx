import PropTypes from 'prop-types'

function Question(props) {

  function getStyle(code) {
    var style
    switch(code) {
      case 1:
        style = "button-selected-blue"
        break;

      case 2:
        style = "button-faded-blue"
        break;
      
      case 3:
        style = "button-green"
        break;

      case 4:
        style = "button-faded-red"
        break;
      
      default:
        style = "button-blue"
    }
    return style
  }

  const answerElements = props.answers.map((answer) => (
    <button 
      key={answer.id} 
      className={`answers-button ${getStyle(answer.style)}`}
      onClick={() => props.selectAnswer(props.id, answer.id)}
      >{answer.text}
    </button>
  ))
  // console.log(answerElements)

  return (
    <div className='question-container'>
      <h1 className='query'>{props.query}</h1>
      <div className='answers'>
        {answerElements}
      </div>
      <br />
    </div>
  )
}

export default Question

Question.propTypes = {
  key: PropTypes.string,
  id: PropTypes.string,
  query: PropTypes.string,
  answers: PropTypes.array,
  selectAnswer: PropTypes.func
}