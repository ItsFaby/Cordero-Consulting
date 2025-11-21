# Configuración de Firebase - Formulario de Contacto

Este documento explica cómo configurar Firebase para el envío automático de correos electrónicos desde el formulario de contacto.

## 📋 Requisitos Previos

1. Tener una cuenta de Firebase
2. Tener instalado Node.js y npm
3. Tener instalado Firebase CLI: `npm install -g firebase-tools`

## 🚀 Pasos de Configuración

### 1. Configurar el Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto "cordero-consulting"
3. Ve a **Project Settings** (⚙️) > **General**
4. En la sección "Your apps", copia la configuración de Firebase

### 2. Actualizar la Configuración del Frontend

Edita el archivo `public/firebase-config.js` y reemplaza los valores con los de tu proyecto:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "cordero-consulting.firebaseapp.com",
    projectId: "cordero-consulting",
    storageBucket: "cordero-consulting.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
```

### 3. Activar Firestore

1. En Firebase Console, ve a **Firestore Database**
2. Haz clic en **Create database**
3. Selecciona modo de producción
4. Elige la ubicación más cercana a tus usuarios

### 4. Configurar Gmail para Envío de Correos

Para usar Gmail con nodemailer, necesitas crear una contraseña de aplicación:

1. Ve a tu [Cuenta de Google](https://myaccount.google.com/)
2. Ve a **Seguridad** > **Verificación en dos pasos** (actívala si no está activada)
3. Ve a **Contraseñas de aplicaciones**
4. Selecciona "Correo" y "Otro (nombre personalizado)"
5. Nombra la aplicación "Cordero Consulting"
6. Copia la contraseña generada (16 caracteres)

### 5. Instalar Dependencias de Cloud Functions

```bash
cd functions
npm install
```

### 6. Configurar Variables de Entorno para Cloud Functions

```bash
firebase login
firebase functions:config:set gmail.email="kevincorderobrizuela@gmail.com"
firebase functions:config:set gmail.password="fvqh yhtp zzbn vkiu"
```

Verifica la configuración:
```bash
firebase functions:config:get
```

### 7. Desplegar Firestore Rules e Indexes

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### 8. Desplegar Cloud Functions

```bash
firebase deploy --only functions
```

### 9. Actualizar el plan de Firebase (Importante)

Las Cloud Functions requieren el plan **Blaze (Pay as you go)**:

1. Ve a Firebase Console > **Usage and billing**
2. Haz clic en **Modify plan**
3. Selecciona el plan **Blaze**
4. Agrega un método de pago

**Nota:** El plan Blaze incluye uso gratuito generoso:
- 2M de invocaciones por mes
- 400,000 GB-segundos por mes
- Es muy probable que permanezcas dentro del nivel gratuito

### 10. Probar el Formulario

1. Despliega los cambios al hosting:
```bash
firebase deploy --only hosting
```

2. Abre tu sitio web y prueba el formulario de contacto

## 🔍 Verificación

Después de enviar un mensaje de prueba:

1. Ve a Firestore Console y verifica que se creó un documento en `contactMessages`
2. Revisa tu correo (kevincorderobrizuela@gmail.com) para verificar que recibiste la notificación
3. El remitente debería recibir un correo de confirmación

## 🐛 Solución de Problemas

### Los correos no se envían

1. Verifica los logs de Cloud Functions:
```bash
firebase functions:log
```

2. Verifica que configuraste correctamente las credenciales de Gmail:
```bash
firebase functions:config:get
```

### Error: "Missing or insufficient permissions"

Verifica que las reglas de Firestore estén desplegadas:
```bash
firebase deploy --only firestore:rules
```

### Error al desplegar funciones

Asegúrate de estar en el plan Blaze y que las dependencias están instaladas:
```bash
cd functions
npm install
```

## 📧 Configuración de Correo Personalizada

Si quieres usar otro servicio de correo (no Gmail), edita `functions/index.js`:

```javascript
const mailTransport = nodemailer.createTransport({
    host: 'smtp.tuservidor.com',
    port: 587,
    secure: false,
    auth: {
        user: 'tu-email@dominio.com',
        pass: 'tu-contraseña'
    }
});
```

## 📊 Monitoreo

Para ver los mensajes recibidos:

1. Ve a Firestore Console
2. Navega a la colección `contactMessages`
3. Verás todos los mensajes con sus estados

## 🔒 Seguridad

- Las reglas de Firestore permiten que cualquiera cree mensajes (necesario para el formulario público)
- Solo usuarios autenticados pueden leer/actualizar/eliminar mensajes
- Las credenciales de correo están almacenadas de forma segura en Firebase Functions Config

## 📱 Comandos Útiles

```bash
# Ver logs en tiempo real
firebase functions:log --only sendContactEmail

# Desplegar todo
firebase deploy

# Desplegar solo hosting
firebase deploy --only hosting

# Desplegar solo functions
firebase deploy --only functions

# Probar functions localmente
cd functions && npm run serve
```

## ✅ Checklist de Configuración

- [ ] Configuración de Firebase actualizada en `firebase-config.js`
- [ ] Firestore activado
- [ ] Contraseña de aplicación de Gmail generada
- [ ] Variables de entorno configuradas
- [ ] Dependencias de Cloud Functions instaladas
- [ ] Plan Blaze activado
- [ ] Reglas de Firestore desplegadas
- [ ] Índices de Firestore desplegados
- [ ] Cloud Functions desplegadas
- [ ] Hosting desplegado
- [ ] Formulario probado y funcionando

---

**¡Listo!** Tu formulario de contacto ahora está conectado con Firebase y enviará correos electrónicos automáticamente. 🎉
