import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { FaCarCrash } from 'react-icons/fa';

export default function Custom404() {
  return (
    <div className="container">
      <style>
        {`
          .container {
            background-color: #1f2332;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: white;
            text-align: center;
          }
          .icon {
            font-size: 9rem;
            color: #d1d5db; /* Equivalent to text-gray-200 */
          }
          .title {
            font-size: 4rem; /* 6xl is approximately 4rem */
            font-weight: 900; /* font-black */
            margin: 0;
          }
          .subtitle {
            font-size: 1.5rem; /* 2xl is approximately 1.5rem */
            font-weight: 600; /* font-semibold */
            color: #d1d5db; /* Equivalent to text-gray-200 */
            margin-top: 0.5rem;
          }
          .description {
            margin-top: 1rem;
            font-size: 1rem;
          }
          .button {
            margin-top: 1rem;
            padding: 1rem 2rem;
            background-color: #4f46e5; /* bg-indigo-800 */
            color: #d1d5db; /* text-gray-200 */
            font-weight: 600; /* font-semibold */
            font-size: 1.125rem; /* text-lg */
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            border: none;
            cursor: pointer;
            text-decoration: none;
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          .button:hover {
            background-color: #3730a3; /* hover:bg-indigo-900 */
            color: #e5e7eb; /* hover:text-gray-300 */
          }
          .icon-chevron {
            width: 2rem;
            height: 2rem;
          }
        `}
      </style>
      <div>
        <FaCarCrash className="icon" />
      </div>
      <h2 className="title">uRent</h2>
      <h3 className="subtitle">404 - Seite nicht gefunden</h3>
      <p className="description">
        Die Seite, die du suchst, existiert nicht oder ist nicht mehr verfügbar.
      </p>
      <a href="/" className="button">
        <ChevronLeft className="icon-chevron" /> Zurück zur Startseite
      </a>
    </div>
  );
}
