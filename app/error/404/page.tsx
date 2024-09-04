import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { FaCarCrash } from 'react-icons/fa';

export default function Custom404() {
  return (
    <div style={styles.container}>
      <div>
        <FaCarCrash style={styles.icon} />
      </div>
      <h2 style={styles.title}>uRent</h2>
      <h3 style={styles.subtitle}>404 - Seite nicht gefunden</h3>
      <p style={styles.description}>
        Die Seite, die du suchst, existiert nicht oder ist nicht mehr verfügbar.
      </p>
      <a href="/" style={styles.button}>
        <ChevronLeft style={styles.iconChevron} /> Zurück zur Startseite
      </a>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#1f2332',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    color: 'white',
    textAlign: 'center',
  },
  icon: {
    fontSize: '9rem',
    color: '#d1d5db', // Equivalent to text-gray-200
  },
  title: {
    fontSize: '4rem', // 6xl is approximately 4rem
    fontWeight: 900, // font-black
    margin: 0,
  },
  subtitle: {
    fontSize: '1.5rem', // 2xl is approximately 1.5rem
    fontWeight: 600, // font-semibold
    color: '#d1d5db', // Equivalent to text-gray-200
    marginTop: '0.5rem',
  },
  description: {
    marginTop: '1rem',
    fontSize: '1rem',
  },
  button: {
    marginTop: '1rem',
    padding: '1rem 2rem',
    backgroundColor: '#4f46e5', // bg-indigo-800
    color: '#d1d5db', // text-gray-200
    fontWeight: 600, // font-semibold
    fontSize: '1.125rem', // text-lg
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1rem',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#3730a3', // hover:bg-indigo-900
    color: '#e5e7eb', // hover:text-gray-300
  },
  iconChevron: {
    width: '2rem',
    height: '2rem',
  },
};
