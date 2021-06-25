import React, { FormEvent, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LogoImg from '../Assets/logo.svg'
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss'

type RoomParams = {
  id: string;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}>

type Questions = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}



const Room: React.FC = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const {user} = useAuth()
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<Questions[]>([])

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.once('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted
        }
      })
    })
  }, [roomId])

  async function handleSendQuestion(event: FormEvent){
    event.preventDefault()

    if(newQuestion.trim() === ''){
      return;
    }

    if(!user){
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Letmeask" />
          <RoomCode code={roomId}/>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que voce quer perguntar?"
            onChange={event => {setNewQuestion(event.target.value)}}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
              ) : (
              <span>Para enviar uma pergunta, <button>faça seu login.</button></span> 
              )
            }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Room;