// pages/index.js
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');
  const [showCopy, setShowCopy] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setResult('');
    setShowCopy(false);
    setShowOnboarding(false);

    try {
      const res = await fetch(`/api/verificar?email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (res.ok) {
        setResult(data.message);
        setShowCopy(true);
        setShowOnboarding(true);
      } else {
        setResult(data.message || 'Error al buscar contacto.');
      }
    } catch (error) {
      setResult('Error al conectar con la API.');
      console.error(error);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    alert('Correo copiado al portapapeles');
  };

  const goToOnboarding = () => {
    window.open('https://bienvenida-alumno.vercel.app/', '_blank');
  };

  return (
    <>
      <Head>
        <title>Panel Onboarding Bestwork</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f8fc;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 100%;
            text-align: center;
          }
          input, button {
            width: 100%;
            padding: 12px;
            margin-top: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 1rem;
          }
          button {
            background-color: #ff7f50;
            color: white;
            border: none;
            cursor: pointer;
          }
          button:hover {
            background-color: #e06a3d;
          }
          .logo {
            max-width: 150px;
            margin-bottom: 20px;
          }
        `}</style>
      </Head>
      <div className="container">
        <img src="/logo.png" alt="Logo Bestwork" className="logo" />
        <h2>Panel Onboarding & Cobranza</h2>
        <form onSubmit={handleSearch}>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Verificar</button>
        </form>
        <p>{result}</p>
        {showCopy && <button onClick={copyEmail}>Copiar Correo</button>}
        {showOnboarding && <button onClick={goToOnboarding}>Bienvenida y Onboarding</button>}
      </div>
    </>
  );
}
