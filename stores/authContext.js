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
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    netlifyIdentity.on('login', user => {
      setUser(user);
      netlifyIdentity.close();
      console.log('Login event occured');
    });

    netlifyIdentity.on('logout', e => {
      setUser(null);
      console.log('logout event');
    });
    netlifyIdentity.on('init', user => {
      setAuthReady(true);
      setUser(user);
      console.log('Inıt event');
    });

    // ? Init Netlify Itentity
    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };
  const logout = () => {
    netlifyIdentity.logout();
  };
  const context = {
    user,
    login,
    logout,
    authReady,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
