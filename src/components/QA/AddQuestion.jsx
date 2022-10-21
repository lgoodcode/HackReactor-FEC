import { useState } from 'react'
import { useStore } from '@/utils/fastContext'
import axios from 'axios'

export default function AddQuestion() {
  const setModalContent = useStore('modalContent')[1]
  const currentProduct = useStore('currentProduct')[0]

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  const QuestionForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [questionBody, setQuestionBody] = useState('')

    const questionSubmitHandler = (event) => {
      event.preventDefault()

      if (!email || !questionBody || !username) {
        let values = [
          ['Email', email],
          ['Question', questionBody],
          ['Nickname', username],
        ]
        let falsyValues = values
          .filter((value) => !value[1])
          .map((value) => value[0])
          .join(', ')
        alert(`You must enter the following: ${falsyValues}`)
        return
      }
      if (!emailRegex.test(email)) {
        alert('You must enter the following: Valid email address')
        return
      }
      let question = {
        body: questionBody,
        name: username,
        email: email,
      }
      axios
        .post('/qa/questions', question)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    return (
      <form onSubmit={questionSubmitHandler}>
        <h3>Ask Your Question</h3>
        <h5>About the {`${currentProduct.name}`}</h5>
        <div className="input-group">
          <span>*Nickname</span>
          <input
            onChange={(e) => setUsername(e.target.value)}
            defaultValue={username}
            placeholder="Example: jackson11!"
            className="question-form-username"
          ></input>
          <span className="input-info">
            For privacy reasons, do not use your full name or email address
          </span>
        </div>
        <div className="input-group">
          <span>*Email</span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
            type="text"
            placeholder="Example: jackson@gmail.com"
            className="question-form-email"
            maxLength="60"
          ></input>
        </div>
        <div className="input-group">
          <span>*Question</span>
          <textarea
            onChange={(e) => setQuestionBody(e.target.value)}
            defaultValue={questionBody}
            type="text"
            className="question-form-body"
            maxLength="1000"
          ></textarea>
          <span className="input-info">Fields marked by * are required</span>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }

  return (
    <button onClick={() => setModalContent(<QuestionForm />)} id="add-question">
      ADD A QUESTION +
    </button>
  )
}
