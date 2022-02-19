import netlifyIdentity from 'netlify-identity-widget';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    netlifyIdentity.on('login', user => {
      setUser(user);
      netlifyIdentity.close();
      console.log('Login event occured');
    });
    // ? Init Netlify Itentity
    netlifyIdentity.init();
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };
  const context = {
    user,
    login,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
