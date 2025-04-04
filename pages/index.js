import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');
  const [showIframe, setShowIframe] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setResult('');
    setShowIframe(false);

    try {
      const res = await fetch(`/api/verificar?email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (res.ok) {
        setResult('');
        setShowIframe(true);
      } else {
        setResult(data.message || 'Error al buscar contacto.');
      }
    } catch (error) {
      setResult('Error al conectar con la API.');
    }
  };

  const goBack = () => {
    setShowIframe(false);
  };

  return (
    <>
      <Head>
        <title>Onboarding | Bestwork</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          * {
            box-sizing: border-box;
          }

          body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            height: 100%;
            width: 100%;
          }

          .centered-form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 20px;
            text-align: center;
          }

          .form-box {
            background: white;
            padding: 40px 30px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
          }

          .logo {
            width: 150px;
            margin-bottom: 20px;
          }

          input {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
          }

          button {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            margin-top: 15px;
            background-color: #ff7f50;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }

          button:hover {
            background-color: #e06a3d;
          }

          .error-msg {
            margin-top: 15px;
            color: #cc0000;
            font-size: 14px;
          }

          .iframe-fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            border: none;
            z-index: 999;
          }

          .back-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            padding: 10px 16px;
            background-color: #ff7f50;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
          }

          .back-btn:hover {
            background-color: #e06a3d;
          }
        `}</style>
      </Head>

      {!showIframe ? (
        <div className="centered-form">
          <div className="form-box">
            <h2>Gestión Onboarding y Bienvenida</h2>
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
            {result && <p className="error-msg">{result}</p>}
          </div>
        </div>
      ) : (
        <>
          <button className="back-btn" onClick={goBack}>← Volver</button>
          <iframe
            className="iframe-fullscreen"
            src="https://bienvenida-cobranza.vercel.app/"
            title="Onboarding Bienvenida"
          ></iframe>
        </>
      )}
    </>
  );
}
