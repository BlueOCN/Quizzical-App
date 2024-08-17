import PropTypes from 'prop-types'

function Question(props) {
    return (
        <div className='question-container'>
            <h1 className='query'>{props.query}</h1>
            <div className='answers'>
              <button className='answers-button'>{props.shuffledAnswers[0]}</button>
              <button className='answers-button'>{props.shuffledAnswers[1]}</button>
              <button className='answers-button'>{props.shuffledAnswers[2]}</button>
              <button className='answers-button'>{props.shuffledAnswers[3]}</button>
            </div>
            <br />
          </div>
    )
}

export default Question

Question.propTypes = {
  key: PropTypes.string,
  query: PropTypes.string,
  shuffledAnswers: PropTypes.array
}