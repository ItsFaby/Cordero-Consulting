const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configuración del transporte de correo
// IMPORTANTE: Configura estas variables de entorno en Firebase:
// firebase functions:config:set gmail.email="tu-email@gmail.com" gmail.password="tu-app-password"
const gmailEmail = functions.config().gmail?.email;
const gmailPassword = functions.config().gmail?.password;

// Si no hay configuración, usar variables de entorno de desarrollo
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail || process.env.GMAIL_EMAIL,
        pass: gmailPassword || process.env.GMAIL_PASSWORD
    }
});

// Cloud Function que se ejecuta cuando se crea un nuevo mensaje de contacto
exports.sendContactEmail = functions.firestore
    .document('contactMessages/{messageId}')
    .onCreate(async (snap, context) => {
        const data = snap.data();
        const messageId = context.params.messageId;

        console.log('Nuevo mensaje de contacto recibido:', messageId);

        // Correo para el administrador (tú)
        const adminMailOptions = {
            from: '"Cordero Consulting - Formulario de Contacto" <noreply@corderoconsulting.com>',
            to: 'kevincorderobrizuela@gmail.com',
            subject: `🔔 Nuevo mensaje de contacto: ${data.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Cordero Consulting</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Nuevo mensaje de contacto</p>
                    </div>

                    <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Información del Cliente</h2>

                        <table style="width: 100%; margin: 20px 0;">
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-weight: bold; width: 30%;">📝 Nombre:</td>
                                <td style="padding: 10px 0; color: #333;">${data.name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-weight: bold;">📧 Email:</td>
                                <td style="padding: 10px 0; color: #333;"><a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a></td>
                            </tr>
                            ${data.phone ? `
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-weight: bold;">📱 Teléfono:</td>
                                <td style="padding: 10px 0; color: #333;">${data.phone}</td>
                            </tr>
                            ` : ''}
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-weight: bold;">🎯 Servicio:</td>
                                <td style="padding: 10px 0; color: #333;">${data.service}</td>
                            </tr>
                        </table>

                        <h3 style="color: #333; margin-top: 30px;">💬 Mensaje:</h3>
                        <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #667eea; border-radius: 5px; margin: 15px 0; line-height: 1.6;">
                            ${data.message.replace(/\n/g, '<br>')}
                        </div>

                        <div style="margin-top: 30px; padding: 20px; background-color: #f0f7ff; border-radius: 5px; text-align: center;">
                            <p style="margin: 0; color: #666; font-size: 14px;">
                                Mensaje recibido el: <strong>${new Date().toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })}</strong>
                            </p>
                        </div>
                    </div>

                    <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                        <p>Este es un mensaje automático del sistema de contacto de Cordero Consulting</p>
                    </div>
                </div>
            `
        };

        // Correo de confirmación para el cliente
        const clientMailOptions = {
            from: '"Cordero Consulting" <noreply@corderoconsulting.com>',
            to: data.email,
            subject: '✅ Hemos recibido tu mensaje - Cordero Consulting',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Cordero Consulting</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Diseño Estratégico & Innovación</p>
                    </div>

                    <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="color: #333;">¡Hola ${data.name}! 👋</h2>

                        <p style="color: #666; line-height: 1.8; font-size: 16px;">
                            Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en un plazo de <strong>24 a 48 horas</strong>.
                        </p>

                        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 25px 0;">
                            <p style="margin: 0 0 10px 0; color: #666;"><strong>Tu mensaje:</strong></p>
                            <p style="margin: 0; color: #333; font-style: italic;">
                                "${data.message}"
                            </p>
                        </div>

                        <p style="color: #666; line-height: 1.8; font-size: 16px;">
                            Mientras tanto, puedes:
                        </p>

                        <ul style="color: #666; line-height: 1.8;">
                            <li>📅 <a href="https://calendly.com/kevincorderobrizuela/30min" style="color: #667eea; text-decoration: none;">Agendar una reunión directa</a></li>
                            <li>🌐 Visitar nuestro <a href="https://corderoconsulting.com/portfolio.html" style="color: #667eea; text-decoration: none;">portafolio de proyectos</a></li>
                            <li>📧 Contactarnos directamente a kevincorderobrizuela@gmail.com</li>
                        </ul>

                        <div style="margin-top: 30px; padding: 20px; background-color: #f0f7ff; border-left: 4px solid #667eea; border-radius: 5px;">
                            <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">¿Qué hacemos diferente?</h3>
                            <ul style="margin: 10px 0; padding-left: 20px; color: #666;">
                                <li>✓ Enfoque integral: de la idea al mercado</li>
                                <li>✓ Validación temprana para reducir riesgos</li>
                                <li>✓ Prototipos rápidos y soluciones escalables</li>
                            </ul>
                        </div>

                        <div style="text-align: center; margin-top: 30px;">
                            <p style="color: #999; font-size: 14px; margin: 0;">Saludos,</p>
                            <p style="color: #333; font-weight: bold; font-size: 16px; margin: 5px 0;">Kevin Cordero</p>
                            <p style="color: #667eea; font-size: 14px; margin: 0;">Cordero Consulting</p>
                        </div>
                    </div>

                    <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                        <p>Costa Rica | kevincorderobrizuela@gmail.com</p>
                    </div>
                </div>
            `
        };

        try {
            // Enviar ambos correos
            await Promise.all([
                mailTransport.sendMail(adminMailOptions),
                mailTransport.sendMail(clientMailOptions)
            ]);

            console.log('Correos enviados exitosamente');

            // Actualizar el estado del mensaje en Firestore
            await snap.ref.update({
                emailSent: true,
                emailSentAt: admin.firestore.FieldValue.serverTimestamp()
            });

            return { success: true };
        } catch (error) {
            console.error('Error al enviar correos:', error);

            // Marcar el error en Firestore
            await snap.ref.update({
                emailSent: false,
                emailError: error.message,
                emailErrorAt: admin.firestore.FieldValue.serverTimestamp()
            });

            throw new functions.https.HttpsError('internal', 'Error al enviar el correo');
        }
    });
