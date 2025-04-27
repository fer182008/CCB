// server.js
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const Configuration = OpenAI.Configuration;
const OpenAIApi = OpenAI.OpenAIApi;
import dotenv from 'dotenv';

// Cargar variables de entorno (.env)
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar CORS (permitir solo tu dominio en producción)
app.use(cors({
    origin: '*'
}));
app.use(express.json());

// Configurar OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

// Ruta de API para el chat
app.post('/api/chat', async (req, res) => {
    const { mensaje } = req.body;

    if (!mensaje) {
        return res.status(400).json({ error: 'Mensaje requerido' });
    }

    try {
        const respuestaIA = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                { role: "system", content: "Eres ClaudiaBot, un asistente virtual experto en confección de ropa, bordados y uniformes. Sé amigable, profesional y ofrece cotizaciones si te las piden." },
                { role: "user", content: mensaje }
            ],
            temperature: 0.7
        });

        const respuesta = respuestaIA.choices[0].message.content.trim();
        res.json({ respuesta });

    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error al generar respuesta' });
    }
});

// Nueva ruta para recibir pedidos
app.post('/api/pedidos', async (req, res) => {
    const { nombre, detalle /* ... otros datos del formulario */ } = req.body;

    if (!nombre || !detalle) {
        return res.status(400).json({ error: 'Nombre y detalle del pedido son requeridos' });
    }

    try {
        // Aquí implementar la lógica para guardar el pedido
        console.log('Nuevo pedido recibido:', { nombre, detalle });

        // Aquí implementar la lógica para notificar a la dueña (ejemplo básico)
        // En un entorno real, usarías un servicio de correo electrónico, base de datos, etc.
        console.log('Pedido para Claudia:', { nombre, detalle });

        res.json({ message: 'Pedido recibido correctamente' });

    } catch (error) {
        console.error('Error al procesar el pedido:', error);
        res.status(500).json({ error: 'Error al procesar el pedido' });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});