import { useHistory } from 'react-router-dom'
import GoogleImg from '../Assets/google-icon.svg'
import IllustrationImg from '../Assets/illustration.svg'
import LogoImg from '../Assets/logo.svg'
import Button from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import '../styles/auth.scss'




export default function Home() {
  const history = useHistory()

  const {signInWithGoogle, user} = useAuth()

  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={IllustrationImg} alt="Illustration" />
        <strong>Crie salas de Q &amp; A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
            <img src={LogoImg} alt="LetmeAsk" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={GoogleImg} alt="Google" />
            Crie sua sala com Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
