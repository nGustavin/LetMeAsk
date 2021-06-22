import {createContext} from 'react';
import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

import { BrowserRouter, Route } from 'react-router-dom'
import { useState } from 'react';
import { auth, firebase,  } from './services/firebase';


type User = {
  id: string;
  name: string;
  avatar: string;
}


type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => void;
}

export const AuthContext = createContext({} as AuthContextType)

function App() {
  const [user, setUser] = useState<User>()

  function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()

    auth.signInWithPopup(provider).then(result => {
      if(result.user){
        const {displayName, photoURL, uid} = result.user

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })
  }

  return (
    <BrowserRouter>
     <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;