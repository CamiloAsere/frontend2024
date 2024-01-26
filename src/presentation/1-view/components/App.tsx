// App.js
// Importamos React y useState y useEffect hooks
import React, { useState, useEffect } from 'react'

// Creamos el componente App usando una función
function App() {
  // Usamos useState para manejar el estado de los mensajes y el nuevo mensaje
  const [mensajes, setMensajes] = useState([])
  const [nuevoMensaje, setNuevoMensaje] = useState('')

  // Usamos useEffect para obtener los mensajes existentes del servidor cuando se monta el componente
  useEffect(() => {
    fetch('http://localhost:3000/mensajes')
      .then((res) => res.json())
      .then((data) => {
        // Actualizamos el estado de los mensajes con los datos recibidos
        setMensajes(data.mensajes)
      })
  }, [])

  // Creamos la función handleSendMessage para enviar el mensaje al bot cuando se haga clic en el botón
  function handleSendMessage() {
    // Usamos la función fetch para enviar el mensaje al bot usando una petición POST
    fetch('http://localhost:3000/bot/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          text: `/enviar ${nuevoMensaje}`,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Si el bot responde con éxito, agregamos el nuevo mensaje al estado de los mensajes
        if (data.ok) {
          setMensajes([...mensajes, nuevoMensaje])
          // Limpiamos el estado del nuevo mensaje
          setNuevoMensaje('')
        } else {
          // Si hay algún error, lo mostramos en la consola
          console.error(data.error)
        }
      })
  }

  // Mostramos los mensajes existentes y un campo de entrada de texto para escribir un nuevo mensaje en la interfaz de usuario
  return (
    <div className='App'>
      <h1>Bot de Telegram con Express y Telegraf</h1>
      <ul>
        {mensajes.map((mensaje, index) => (
          <li key={index}>{mensaje}</li>
        ))}
      </ul>
      <input
        type='text'
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
      />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  )
}

export default App
