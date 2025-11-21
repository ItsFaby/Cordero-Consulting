# 🏖️ Reto Playas Costa Rica - Guía Completa

Sistema interactivo para descubrir, puntuar y compartir experiencias sobre las playas de Costa Rica.

## 🎯 Características

### 1. Mapa 3D Interactivo
- **Visualización 3D** de Costa Rica dividido por provincias
- **Marcadores de playas** con ubicaciones reales
- **Interactividad**: rotación con mouse, zoom con scroll
- **Resaltado dinámico** cuando seleccionas una playa

### 2. Sistema de Búsqueda
- **Búsqueda por nombre**: Encuentra playas escribiendo su nombre
- **Búsqueda por número**: Usa el número de Reto Playas
- **Resultados en tiempo real** mientras escribes

### 3. Sistema de Puntuación
- **Estrellas**: 1-5 estrellas (cada estrella = 2 puntos, total 1-10)
- **Comentarios**: Comparte tu experiencia (opcional, máx. 500 caracteres)
- **Almacenamiento en Firebase**: Todas las puntuaciones se guardan en la nube

### 4. Listas de Playas
- **Mis Favoritas**: Las playas mejor puntuadas por Reto Playas (curadas)
- **Elecciones del Público**: Las favoritas de los visitantes (basadas en votos)
- **Comentarios**: Ver todas las opiniones de cada playa

## 📁 Estructura de Archivos

```
public/
├── reto-playas.html          # Página principal
├── reto-playas.css           # Estilos
├── reto-playas.js            # Lógica principal
├── reto-playas-data.js       # Datos de playas (28 playas incluidas)
└── firebase-config.js        # Configuración de Firebase
```

## 🚀 Configuración Inicial

### 1. Configurar Firebase

El proyecto ya está configurado con Firebase. Solo necesitas actualizar la configuración:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `cordero-consulting`
3. Ve a **Project Settings** > **General**
4. Copia tu configuración y actualiza `public/firebase-config.js`

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

### 2. Activar Firestore

1. En Firebase Console, ve a **Firestore Database**
2. Haz clic en **Create database**
3. Selecciona modo de **producción**
4. Elige ubicación: **us-central** (o la más cercana)

### 3. Desplegar Reglas de Firestore

Las reglas ya están configuradas en `firestore.rules`. Despliégalas:

```bash
firebase login
firebase deploy --only firestore:rules
```

### 4. Desplegar el Sitio

```bash
firebase deploy --only hosting
```

## 🗺️ Datos de Playas

La aplicación incluye **28 playas** de Costa Rica distribuidas en 3 provincias:

### Guanacaste (10 playas)
- Playa Conchal, Flamingo, Tamarindo, Grande, Hermosa, Del Coco, Ocotal, Nosara, Sámara, Carrillo

### Puntarenas (10 playas)
- Manuel Antonio, Espadilla, Hermosa, Jacó, Montezuma, Santa Teresa, Mal País, Uvita, Dominical, Tambor

### Limón (8 playas)
- Puerto Viejo, Cocles, Chiquita, Manzanillo, Cahuita, Negra, Punta Uva, Tortuguero

### Estructura de Datos de Playa

```javascript
{
    id: "playa-001",
    numero: 1,                           // Número de Reto Playas
    nombre: "Playa Conchal",
    provincia: "Guanacaste",
    ubicacion: { lat: 10.3897, lng: -85.7936 },
    puntuacionRetoPlayas: 9,             // Puntuación oficial (1-10)
    esFavorita: true,                    // Si es favorita de Reto Playas
    promedioUsuarios: 8.5,               // Promedio de usuarios
    totalVotos: 15,                      // Total de votos
    comentarios: [...]                   // Array de comentarios
}
```

## 🎨 Personalización

### Agregar Más Playas

Edita `public/reto-playas-data.js`:

```javascript
const playasCostaRica = [
    // ... playas existentes
    {
        id: "playa-029",
        numero: 29,
        nombre: "Tu Nueva Playa",
        provincia: "Provincia",
        ubicacion: { lat: LATITUD, lng: LONGITUD },
        puntuacionRetoPlayas: 8,
        esFavorita: false
    }
];
```

**Tip**: Usa [Google Maps](https://www.google.com/maps) para obtener coordenadas precisas.

### Cambiar Colores

Edita `public/reto-playas.css`:

```css
:root {
    --playas-primary: #0077be;    /* Color principal */
    --playas-secondary: #ffd700;  /* Estrellas */
    --playas-accent: #ff6b35;     /* Acentos */
    --playas-green: #2d5a3d;      /* Verde Costa Rica */
}
```

### Modificar el Mapa 3D

En `public/reto-playas.js`, función `init3DMap()`:

```javascript
camera.position.set(0, 15, 25);  // Posición de la cámara
scene.background = new THREE.Color(0xe3f2fd);  // Color de fondo
```

## 💻 Uso de la Aplicación

### Para Visitantes

1. **Explorar**: Navega por el mapa 3D y las listas
2. **Buscar**: Encuentra una playa por nombre o número
3. **Puntuar**: Selecciona estrellas y agrega un comentario
4. **Ver Opiniones**: Haz clic en "💬 comentarios" para leer experiencias

### Para el Administrador (Reto Playas)

1. **Actualizar Favoritas**: Edita `esFavorita: true` en `reto-playas-data.js`
2. **Cambiar Puntuaciones**: Modifica `puntuacionRetoPlayas` en `reto-playas-data.js`
3. **Agregar Playas**: Añade nuevos objetos al array `playasCostaRica`

## 📊 Ver Estadísticas

### Desde Firebase Console

1. Ve a **Firestore Database**
2. Navega a la colección `playas`
3. Verás todas las playas con:
   - `promedioUsuarios`: Promedio de puntuaciones
   - `totalVotos`: Cantidad de votos
   - `comentarios`: Array con todos los comentarios

### Desde el Sitio Web

- **Listas en Vivo**: Las listas se actualizan automáticamente
- **Top 10**: Solo las 10 mejor puntuadas aparecen en "Elecciones del Público"

## 🔧 Solución de Problemas

### El mapa 3D no se muestra

**Problema**: Pantalla azul sin mapa.

**Solución**:
1. Verifica que Three.js se cargó correctamente
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que `reto-playas-data.js` se cargó antes de `reto-playas.js`

### No se guardan las puntuaciones

**Problema**: Al enviar puntuación, aparece error.

**Solución**:
1. Verifica que Firebase está configurado en `firebase-config.js`
2. Verifica que Firestore está activado
3. Verifica que las reglas están desplegadas:
   ```bash
   firebase deploy --only firestore:rules
   ```
4. Revisa la consola del navegador para errores

### Las playas no aparecen en las listas

**Problema**: Listas vacías o con "Cargando...".

**Solución**:
1. Verifica que `reto-playas-data.js` se carga correctamente
2. Abre la consola y verifica errores de JavaScript
3. Verifica que Firebase está conectado

## 📱 Responsive Design

La aplicación es totalmente responsive:

- **Desktop**: Mapa a la izquierda, sidebar a la derecha
- **Tablet/Mobile**: Diseño de una sola columna
- **Touch**: Funciona perfecto en dispositivos táctiles

## 🎯 Próximas Mejoras Sugeridas

### Funcionalidades

- [ ] **Filtros**: Por provincia, puntuación, cercanía
- [ ] **Galería de fotos**: Subir fotos de cada playa
- [ ] **Comparación**: Comparar dos playas lado a lado
- [ ] **Rutas**: Cómo llegar a cada playa
- [ ] **Clima**: Integración con API de clima
- [ ] **Actividades**: Surf, snorkel, etc.
- [ ] **Servicios**: Restaurantes, estacionamiento, etc.

### Tecnología

- [ ] **PWA**: Convertir en Progressive Web App
- [ ] **Offline**: Modo offline con Service Workers
- [ ] **Notificaciones**: Avisar de nuevas playas o comentarios
- [ ] **Compartir**: Botones para compartir en redes sociales
- [ ] **Analytics**: Google Analytics para ver estadísticas

### Social

- [ ] **Login**: Perfiles de usuario
- [ ] **Badges**: Insignias por visitar playas
- [ ] **Mapa de progreso**: Marcar playas visitadas
- [ ] **Compartir experiencias**: Publicar en Instagram/Facebook

## 🌐 URLs

- **Producción**: https://cordero-consulting.web.app/reto-playas.html
- **Firebase Console**: https://console.firebase.google.com/project/cordero-consulting

## 📧 Contacto

Para soporte o consultas:
- **Email**: info@corderoconsulting.com
- **Sitio Web**: [Cordero Consulting](https://cordero-consulting.web.app)

## 📝 Notas Técnicas

### Dependencias

- **Three.js** (r128): Renderizado 3D del mapa
- **Firebase** (9.22.0): Backend y base de datos
- **Vanilla JavaScript**: Sin frameworks adicionales

### Navegadores Soportados

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari/Chrome

### Performance

- **Mapa 3D**: ~60 FPS en dispositivos modernos
- **Carga inicial**: < 3 segundos
- **Búsqueda**: Instantánea (filtrado local)

## 🏆 Créditos

**Desarrollado por**: [Cordero Consulting](https://cordero-consulting.web.app)

**Para**: Reto Playas Costa Rica

**Año**: 2024

---

**¡Pura Vida!** 🇨🇷 Disfruta descubriendo las mejores playas de Costa Rica.
