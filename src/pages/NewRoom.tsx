import { Link } from 'react-router-dom'
import IllustrationImg from '../Assets/illustration.svg'
import LogoImg from '../Assets/logo.svg'
import Button from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import '../styles/auth.scss'


export default function NewRoom() {
  const {user} = useAuth()

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
          <h2>Criar uma nova sala</h2>
          <h1>{user?.name}</h1>
          <form>
            <input 
              type="text" 
              placeholder="Nome da sala"
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
