// pages/api/verificar.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email es requerido' });
  }

  try {
    const response = await axios.get(process.env.ACTIVE_CAMPAIGN_API_URL, {
      headers: {
        'Api-Token': process.env.ACTIVE_CAMPAIGN_API_TOKEN
      },
      params: { email }
    });

    if (response.data.contacts && response.data.contacts.length > 0) {
      return res.status(200).json({ message: `Contacto encontrado: ${email}` });
    } else {
      return res.status(404).json({ message: "El contacto no existe. Comuníquese con el equipo de Marketing y Operaciones" });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error en la solicitud: ${error.message}` });
  }
}
