import Question from './Question'

export default function QuestionsList({ questions, helpfulnessClick }) {
  return (
    <div className="questions-list" data-testid="questions-list">
      {questions.map((question, index) => (
        <Question question={question} helpfulnessClick={helpfulnessClick} key={index} />
      ))}
    </div>
  )
}