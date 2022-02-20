import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../stores/authContext';
import styles from '../styles/Guides.module.css';

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        '/.netlify/functions/guides',
        user && {
          headers: {
            Authorization: 'Bearer ' + user.token.access_token,
          },
        },
      )
        .then(res => {
          if (!res.ok) {
            throw Error('You must be log in');
          }
          return res.json();
        })
        .then(data => {
          setGuides(data);
          setError(null);
          console.log(data);
        })
        .catch(err => {
          setError(err.message);
          console.log(err);
          setGuides(null);
        });
    }
  }, [user, authReady]);
  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading</div>}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {guides &&
        guides.map(guide => {
          return (
            <div key={guide.title} className={styles.card}>
              <h3>{guide.title}</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                explicabo facere dolorum atque consectetur dolor asperiores
                facilis sint libero, assumenda quidem blanditiis quaerat ex quas
                itaque vero inventore illo est, minus rem at accusamus.
                Temporibus libero facere sit explicabo. Corporis deserunt
                laboriosam laborum expedita culpa iusto molestias? Quaerat,
                consequuntur libero!
              </p>
              <h4>Written by {guide.author}</h4>
            </div>
          );
        })}
    </div>
  );
}
