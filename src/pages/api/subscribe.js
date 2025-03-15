// Cambiar "post" a "POST" para evitar la advertencia de obsolescencia
export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    
    // Aquí implementarías la lógica para guardar el email
    // Por ejemplo, enviándolo a tu API de WordPress o a un servicio como Mailchimp
    
    // Por ahora solo registramos el email recibido
    console.log('Email recibido para suscripción:', email);
    
    // Redirigir o devolver respuesta
    return new Response(JSON.stringify({
      success: true,
      message: 'Suscripción recibida correctamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error en la suscripción:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Ocurrió un error al procesar la suscripción'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
