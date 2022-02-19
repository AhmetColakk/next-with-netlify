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

    netlifyIdentity.on('logout', e => {
      setUser(null);
      console.log('logout event');
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
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
