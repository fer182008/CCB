document.addEventListener('DOMContentLoaded', function () {
    const botAsistente = document.getElementById('bot-asistente');
    const chatContainer = document.getElementById('chat-container');
    const closeChatButton = document.getElementById('close-chat-button');
    const chatMessages = document.getElementById('chat-messages');
    const userMessageInput = document.getElementById('user-message');
    const sendButton = document.getElementById('send-button');
    const orderForm = document.getElementById('order-form');
    const pedidoForm = document.getElementById('pedido-form');
    const mensajeBotInicialBoton = document.querySelector('#bot-asistente .mensaje-bot');
    const sugerenciasContainer = document.querySelector('.sugerencias-preguntas');
    const cerrarPedidoButton = document.getElementById('cerrar-pedido');
    const abrirEncuestaBtn = document.getElementById('abrirEncuesta');
    const encuestaModal = document.getElementById('encuestaModal'); // corregido
    const cerrarEncuestaBtn = document.getElementById('cerrarEncuesta');
    const formularioEncuesta = document.getElementById('formulario-encuesta');
    const mensajeEncuesta = document.getElementById('mensaje-encuesta');
    const whatsappNumber = '56995012741';

    // Mostrar/ocultar chat
    if (botAsistente && chatContainer) {
        botAsistente.addEventListener('click', () => {
            const isHidden = chatContainer.style.display === 'none' || chatContainer.style.display === '';
            chatContainer.style.display = isHidden ? 'flex' : 'none';
            if (mensajeBotInicialBoton) {
                mensajeBotInicialBoton.style.visibility = isHidden ? 'hidden' : 'visible';
                mensajeBotInicialBoton.style.opacity = isHidden ? '0' : '1';
            }
        });
    }

    if (closeChatButton) {
        closeChatButton.addEventListener('click', () => {
            chatContainer.style.display = 'none';
            if (mensajeBotInicialBoton) {
                mensajeBotInicialBoton.style.visibility = 'visible';
                mensajeBotInicialBoton.style.opacity = '1';
            }
        });
    }

    if (cerrarPedidoButton) {
        cerrarPedidoButton.addEventListener('click', () => {
            if (orderForm) orderForm.style.display = 'none';
        });
    }

    if (sendButton) sendButton.addEventListener('click', sendMessage);
    if (userMessageInput) {
        userMessageInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') sendMessage();
        });
    }

    if (sugerenciasContainer) {
        sugerenciasContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-sugerencia')) {
                const preguntaSugerida = event.target.dataset.pregunta;
                if (userMessageInput) {
                    userMessageInput.value = preguntaSugerida;
                    sendMessage();
                }
            }
        });
    }

    function displayMessage(sender, text) {
        if (!chatMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.innerHTML = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function responderPregunta(mensaje) {
        const mensajeLower = mensaje.toLowerCase();
        const telefonoDuena = '56995012741';
        const mensajeWhatsApp = encodeURIComponent("Hola! buenas tardes. Quisiera realizar un pedido.¿Podría indicarme la dirección exacta para llegar a su ubicación en Colbún, por favor?");

        if (mensajeLower.includes("precio") || mensajeLower.includes("costo") || mensajeLower.includes("cuánto") || mensajeLower.includes("cotización") || mensajeLower.includes("vale") || mensajeLower.includes("valor")) {
            return "Para consultas sobre precios y cotizaciones, por favor, proporciona detalles específicos (tipo de prenda, cantidad, tallas, bordados, etc.).";
        } else if (mensajeLower.includes("horario") || mensajeLower.includes("atienden") || mensajeLower.includes("abierto") || mensajeLower.includes("cerrado") || mensajeLower.includes("hora")) {
            return "Nuestro horario de atención es de lunes a viernes de 9:00 AM a 5:00 PM.";
        } else if (mensajeLower.includes("ubicación") || mensajeLower.includes("dónde") || mensajeLower.includes("dirección") || mensajeLower.includes("ubicada") || mensajeLower.includes("ubicados") || mensajeLower.includes("encontrar")) {
            return `Estamos ubicados en Colbún🏠. Puedes contactarnos para más detalles:<br><button class="btn-whatsapp-ubicacion-boton" data-telefono="${telefonoDuena}" data-mensaje="${mensajeWhatsApp}">Preguntar ubicación por WhatsApp</button>`;
        } else if (mensajeLower.includes("uniformes") || mensajeLower.includes("empresa") || mensajeLower.includes("colegio") || mensajeLower.includes("institución") || mensajeLower.includes("escuela") || mensajeLower.includes("liceo")) {
            return "Confeccionamos uniformes personalizados para empresas, colegios e instituciones.";
        } else if (mensajeLower.includes("bordado") || mensajeLower.includes("bordados") || mensajeLower.includes("bordar") || mensajeLower.includes("logo") || mensajeLower.includes("iniciales")) {
            return "Realizamos bordados personalizados en diversas prendas.";
        } else if (mensajeLower.includes("ropa de trabajo") || mensajeLower.includes("vestuario laboral") || mensajeLower.includes("prendas de vestir") || mensajeLower.includes("confeccionan")) {
            return "Podemos confeccionar distintos tipos de vestuario laboral según tus necesidades.";
        } else if (mensajeLower.includes("tallas") || mensajeLower.includes("medidas") || mensajeLower.includes("tamaño")) {
            return "Realizamos prendas a la medida que nos indiques.";
        } else if (mensajeLower.includes("envíos") || mensajeLower.includes("despachan") || mensajeLower.includes("entrega") || mensajeLower.includes("a domicilio")) {
            return "Realizamos envíos a Regiones por Chilexpress (costo adicional).";
        } else if (mensajeLower.includes("hola") || mensajeLower.includes("buenas") || mensajeLower.includes("buenos días") || mensajeLower.includes("buenas tardes") || mensajeLower.includes("buenas noches")) {
            return "¡Hola! ¿En qué puedo ayudarte hoy?";
        } else if (mensajeLower.includes("gracias") || mensajeLower.includes("adiós") || mensajeLower.includes("hasta luego") || mensajeLower.includes("chao")) {
            return "¡De nada! Que tengas un excelente día.";
        } else {
            return "No entendí tu pregunta, ¿podrías reformularla?";
        }
    }

    async function sendMessage() {
        if (!userMessageInput) return;
        const message = userMessageInput.value.trim();
        if (!message) return;

        displayMessage('user', message);
        userMessageInput.value = '';

        const respuestaBot = responderPregunta(message);
        displayMessage('bot', respuestaBot);

        if (message.toLowerCase().includes('pedido') || respuestaBot.toLowerCase().includes('formulario de pedido')) {
            if (orderForm) orderForm.style.display = 'block';
        } else {
            if (orderForm) orderForm.style.display = 'none';
        }
    }

    if (pedidoForm) {
        pedidoForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const nombre = document.getElementById('nombre')?.value;
            const detalle = document.getElementById('detalle')?.value;
            if (!nombre || !detalle) return;

            const pedidoTexto = encodeURIComponent(`Nuevo pedido:\nNombre: ${nombre}\nDetalle: ${detalle}`);
            window.open(`https://wa.me/${whatsappNumber}?text=${pedidoTexto}`, '_blank');

            displayMessage('bot', '¡Pedido enviado por WhatsApp! Te contactaremos pronto😊.');
            pedidoForm.reset();
            if (orderForm) orderForm.style.display = 'none';
        });
    }

    // Botones WhatsApp y Email
    const btnWhatsapp = document.querySelector('.btn-whatsapp');
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', function () {
            window.open(`https://wa.me/${whatsappNumber}?text=Hola%2C%20me%20gustaría%20solicitar%20una%20cotización.`, '_blank');
        });
    }

    const btnEmail = document.querySelector('.btn-email');
    if (btnEmail) {
        btnEmail.addEventListener('click', function () {
            window.location.href = 'mailto:confeccionesclaudia864@gmail.com?subject=Consulta%20de%20Servicio&body=Hola%2C%20me%20gustaría%20realizar%20una%20consulta%20sobre%20sus%20servicios.';
        });
    }

    // Modal Encuesta
    if (abrirEncuestaBtn) {
        abrirEncuestaBtn.onclick = () => {
            encuestaModal.style.display = 'block';
        };
    }

    if (cerrarEncuestaBtn) {
        cerrarEncuestaBtn.onclick = () => {
            encuestaModal.style.display = 'none';
        };
    }

    window.addEventListener('click', function (event) {
        if (event.target === encuestaModal) {
            encuestaModal.style.display = 'none';
        }
    });

    if (formularioEncuesta) {
        formularioEncuesta.addEventListener('submit', function (e) {
            e.preventDefault();
            mensajeEncuesta.classList.remove('oculto');
            setTimeout(() => {
                formularioEncuesta.reset();
                encuestaModal.style.display = 'none';
                mensajeEncuesta.classList.add('oculto');
            }, 2000);
        });
    }
});

// Abrir WhatsApp para ubicación
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-whatsapp-ubicacion-boton')) {
        const telefono = event.target.dataset.telefono;
        const mensaje = event.target.dataset.mensaje;
        window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
    }
});
