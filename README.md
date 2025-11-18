# Cordero Consulting - Sitio Web Profesional

Sitio web profesional para servicios de consultoría en diseño estratégico, innovación y desarrollo de negocios.

## 📁 Estructura de Archivos

```
/
├── index.html          # Página principal
├── portfolio.html      # Página de portafolio
├── contacto.html       # Página de contacto
├── styles.css          # Estilos CSS
├── script.js           # JavaScript para interacciones
└── README.md          # Este archivo
```

## 🎨 Características

- **Diseño minimalista**: Colores neutros con acento verde oscuro
- **Responsive**: Se adapta a móviles, tablets y desktop
- **Navegación suave**: Scroll suave entre secciones
- **Filtros de portafolio**: Sistema de filtrado por categorías
- **Formulario de contacto**: Con validación y feedback visual
- **Animaciones sutiles**: Efectos al hacer scroll y hover

## 🚀 Cómo Usar

### 1. Abrir el sitio localmente

Simplemente abre `index.html` en tu navegador web favorito. No necesitas servidor para desarrollo básico.

### 2. Personalizar contenido

#### Información Personal
Edita en `index.html` y `contacto.html`:
- Tu nombre y título
- Email de contacto
- Ubicación
- Descripción profesional

#### Servicios
En `index.html`, sección `<section class="services">`:
- Edita los títulos de cada servicio
- Modifica las listas de habilidades
- Añade o elimina tarjetas de servicio

#### Portafolio
En `portfolio.html`:
- Reemplaza los proyectos placeholder con tus proyectos reales
- Actualiza títulos, descripciones y tecnologías
- Cambia las categorías según tus necesidades

### 3. Añadir Proyectos Reales al Portafolio

Para cada proyecto, usa esta estructura:

```html
<div class="portfolio-item" data-category="CATEGORIA">
    <div class="portfolio-image">
        <img src="ruta/a/imagen.jpg" alt="Nombre del proyecto">
    </div>
    <div class="portfolio-content">
        <span class="portfolio-tag">Etiqueta</span>
        <h3>Título del Proyecto</h3>
        <p>Descripción breve del proyecto y resultados.</p>
        <div class="portfolio-meta">
            <span>Tecnologías · Usadas · Aquí</span>
        </div>
    </div>
</div>
```

**Categorías disponibles:**
- `marketing` - Marketing Empresarial
- `innovacion` - Innovación & Startups
- `data` - Inteligencia de Datos
- `automation` - Automatización

### 4. Personalizar Colores

En `styles.css`, líneas 8-18, edita las variables CSS:

```css
:root {
    --primary-color: #2d5a3d;      /* Verde oscuro principal */
    --primary-dark: #1f3d2a;       /* Verde más oscuro */
    --primary-light: #3d7a52;      /* Verde claro */
    --accent-color: #4a8c5f;       /* Color de acento */
    /* ... más variables ... */
}
```

## 📧 Configurar Formulario de Contacto

El formulario actualmente simula el envío. Para hacerlo funcional:

### Opción 1: Formspree (Gratis y fácil)
1. Ve a [Formspree.io](https://formspree.io)
2. Crea una cuenta gratuita
3. Obtén tu endpoint URL
4. En `script.js`, reemplaza el código de simulación con:

```javascript
fetch('TU_FORMSPREE_URL', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    formMessage.textContent = '¡Mensaje enviado!';
    formMessage.className = 'form-message success';
    contactForm.reset();
})
.catch(error => {
    formMessage.textContent = 'Error al enviar. Intenta de nuevo.';
    formMessage.className = 'form-message error';
});
```

### Opción 2: EmailJS (Gratis hasta 200 emails/mes)
1. Ve a [EmailJS.com](https://www.emailjs.com)
2. Configura tu servicio de email
3. Obtén tus credenciales
4. Integra según su documentación

### Opción 3: Backend propio
Crea un endpoint API en tu servidor y conéctalo en `script.js`.

## 🌐 Publicar el Sitio

### GitHub Pages (Gratis)
1. Crea un repositorio en GitHub
2. Sube todos los archivos
3. Ve a Settings > Pages
4. Selecciona la rama main como fuente
5. Tu sitio estará en `https://tu-usuario.github.io/nombre-repo`

### Netlify (Gratis)
1. Ve a [Netlify.com](https://www.netlify.com)
2. Arrastra la carpeta con todos los archivos
3. Obtén tu URL instantáneamente

### Vercel (Gratis)
Similar a Netlify, muy fácil de usar.

## 📝 Próximos Pasos

1. **Añadir imágenes reales**: Reemplaza los placeholders con capturas de tus proyectos
2. **Crear casos de estudio detallados**: Páginas individuales para cada proyecto
3. **Añadir testimonios**: Si tienes clientes satisfechos
4. **Integrar analytics**: Google Analytics para ver visitantes
5. **SEO**: Añadir meta tags y descriptions
6. **Blog**: Considera añadir una sección de blog para contenido

## 🎯 Tips de Contenido

### Para el Portafolio
Para cada proyecto incluye:
- **Contexto**: ¿Cuál era el problema?
- **Solución**: ¿Qué hiciste?
- **Resultados**: Métricas, impacto, mejoras
- **Tecnologías**: Herramientas usadas
- **Visualizaciones**: Gráficos, tablas, capturas

### Ejemplos de Proyectos
- Análisis de F1 con machine learning
- Trabajos de Málma (si puedes compartirlos)
- Proyectos de la maestría
- Análisis personales interesantes
- Automatizaciones que has creado

## 🆘 Soporte

Si necesitas ayuda personalizando algo específico, solo pregunta.

## 📊 Mejoras Futuras (Opcional)

- [ ] Sistema de blog
- [ ] Sección de testimonios
- [ ] Página "Sobre mí" expandida
- [ ] Integración con redes sociales
- [ ] Newsletter signup
- [ ] Calculadora de presupuesto
- [ ] Chat en vivo
- [ ] Modo oscuro

---

**Desarrollado para Kevin Cordero**
Cordero Consulting - Diseño Estratégico & Innovación
