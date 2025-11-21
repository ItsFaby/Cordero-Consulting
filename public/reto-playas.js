// Reto Playas Costa Rica - JavaScript Principal

// Estado de la aplicación
let scene, camera, renderer, costaRicaMesh, beachMarkers = [];
let selectedBeach = null;
let currentRating = 0;
let beachesData = [];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    console.log('Inicializando aplicación Reto Playas...');

    // Cargar datos de playas desde Firebase y datos locales
    await loadBeachesData();

    // Inicializar mapa 3D
    init3DMap();

    // Inicializar componentes de UI
    initializeUI();

    // Renderizar listas
    renderFavoritesList();
    renderTopRatedList();
}

// ==================== CARGA DE DATOS ====================

async function loadBeachesData() {
    try {
        // Intentar cargar datos de Firebase
        if (typeof db !== 'undefined') {
            const snapshot = await db.collection('playas').get();

            if (snapshot.empty) {
                console.log('No hay datos en Firebase, usando datos locales e inicializando...');
                await initializeFirebaseData();
            } else {
                // Combinar datos locales con datos de Firebase
                beachesData = playasCostaRica.map(playa => {
                    const fbData = snapshot.docs.find(doc => doc.id === playa.id);
                    if (fbData) {
                        const data = fbData.data();
                        return {
                            ...playa,
                            promedioUsuarios: data.promedioUsuarios || 0,
                            totalVotos: data.totalVotos || 0,
                            comentarios: data.comentarios || []
                        };
                    }
                    return {
                        ...playa,
                        promedioUsuarios: 0,
                        totalVotos: 0,
                        comentarios: []
                    };
                });
            }
        } else {
            console.log('Firebase no disponible, usando solo datos locales');
            beachesData = playasCostaRica.map(playa => ({
                ...playa,
                promedioUsuarios: 0,
                totalVotos: 0,
                comentarios: []
            }));
        }

        console.log(`Cargadas ${beachesData.length} playas`);
    } catch (error) {
        console.error('Error cargando datos:', error);
        // Usar datos locales como fallback
        beachesData = playasCostaRica.map(playa => ({
            ...playa,
            promedioUsuarios: 0,
            totalVotos: 0,
            comentarios: []
        }));
    }
}

async function initializeFirebaseData() {
    if (typeof db === 'undefined') return;

    try {
        const batch = db.batch();

        playasCostaRica.forEach(playa => {
            const docRef = db.collection('playas').doc(playa.id);
            batch.set(docRef, {
                ...playa,
                promedioUsuarios: 0,
                totalVotos: 0,
                comentarios: [],
                fechaCreacion: firebase.firestore.FieldValue.serverTimestamp()
            });
        });

        await batch.commit();
        console.log('Datos inicializados en Firebase');

        // Recargar datos
        await loadBeachesData();
    } catch (error) {
        console.error('Error inicializando Firebase:', error);
    }
}

// ==================== MAPA 3D ====================

function init3DMap() {
    const container = document.getElementById('map3d');

    if (!container) {
        console.error('Contenedor del mapa no encontrado');
        return;
    }

    // Configurar escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe3f2fd);

    // Configurar cámara
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    camera.position.set(0, 15, 25);
    camera.lookAt(0, 0, 0);

    // Configurar renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Crear mapa de Costa Rica
    createCostaRicaMap();

    // Agregar marcadores de playas
    addBeachMarkers();

    // Controles básicos de rotación
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            if (costaRicaMesh) {
                costaRicaMesh.rotation.y += deltaX * 0.005;
                costaRicaMesh.rotation.x += deltaY * 0.005;
                // Limitar rotación en X
                costaRicaMesh.rotation.x = Math.max(-0.5, Math.min(0.5, costaRicaMesh.rotation.x));
            }

            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // Zoom con scroll
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        camera.position.z += e.deltaY * 0.01;
        camera.position.z = Math.max(15, Math.min(40, camera.position.z));
    });

    // Responsive
    window.addEventListener('resize', () => {
        const newAspect = container.clientWidth / container.clientHeight;
        camera.aspect = newAspect;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Animación
    animate();
}

function createCostaRicaMap() {
    // Crear un grupo para el mapa completo
    const mapGroup = new THREE.Group();

    // Convertir coordenadas geográficas a coordenadas 3D
    const points = costaRicaBorders.map(coord => {
        return latLngToVector3(coord.lat, coord.lng);
    });

    // Crear geometría del contorno
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    points.forEach(point => {
        shape.lineTo(point.x, point.y);
    });

    // Crear extrusión para dar volumen
    const extrudeSettings = {
        depth: 0.5,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 2
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({
        color: 0x2d5a3d,
        shininess: 30,
        flatShading: false
    });

    costaRicaMesh = new THREE.Mesh(geometry, material);

    // Agregar borde
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1a3a2a, linewidth: 2 });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    costaRicaMesh.add(wireframe);

    // Centrar el mapa
    const box = new THREE.Box3().setFromObject(costaRicaMesh);
    const center = box.getCenter(new THREE.Vector3());
    costaRicaMesh.position.sub(center);

    mapGroup.add(costaRicaMesh);

    // Agregar labels de provincias (simulado con pequeñas marcas)
    Object.entries(provinciasCostaRica).forEach(([nombre, data]) => {
        const pos = latLngToVector3(data.lat, data.lng);
        const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: data.color });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(pos.x - center.x, pos.y - center.y, 0.6);
        mapGroup.add(marker);
    });

    scene.add(mapGroup);
}

function addBeachMarkers() {
    beachesData.forEach(beach => {
        const pos = latLngToVector3(beach.ubicacion.lat, beach.ubicacion.lng);

        // Centrar según el mapa
        const box = new THREE.Box3().setFromObject(costaRicaMesh);
        const center = box.getCenter(new THREE.Vector3());

        const markerGeometry = new THREE.SphereGeometry(0.12, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({
            color: 0x0077be,
            transparent: true,
            opacity: 0.8
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(pos.x - center.x, pos.y - center.y, 0.7);
        marker.userData = { beach: beach };

        scene.add(marker);
        beachMarkers.push(marker);
    });
}

function highlightBeach(beach) {
    // Restaurar todos los marcadores
    beachMarkers.forEach(marker => {
        marker.material.color.setHex(0x0077be);
        marker.scale.set(1, 1, 1);
    });

    // Resaltar playa seleccionada
    const marker = beachMarkers.find(m => m.userData.beach.id === beach.id);
    if (marker) {
        marker.material.color.setHex(0xffd700);
        marker.scale.set(1.5, 1.5, 1.5);

        // Animar
        animateMarker(marker);
    }
}

function animateMarker(marker) {
    let scale = 1.5;
    let growing = false;

    const animate = () => {
        if (growing) {
            scale += 0.02;
            if (scale >= 1.8) growing = false;
        } else {
            scale -= 0.02;
            if (scale <= 1.5) growing = true;
        }

        marker.scale.set(scale, scale, scale);

        if (selectedBeach && marker.userData.beach.id === selectedBeach.id) {
            requestAnimationFrame(animate);
        } else {
            marker.scale.set(1, 1, 1);
        }
    };

    animate();
}

function latLngToVector3(lat, lng) {
    // Convertir coordenadas geográficas a coordenadas cartesianas 2D
    // Usando proyección simple (no es perfecta pero funciona para visualización)
    const x = (lng + 84) * 2; // Ajustar para centrar
    const y = (lat - 9.5) * 2; // Ajustar para centrar
    return new THREE.Vector3(x, y, 0);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotación automática suave cuando no hay interacción
    if (costaRicaMesh && !document.querySelector('#map3d:hover')) {
        costaRicaMesh.rotation.y += 0.001;
    }

    renderer.render(scene, camera);
}

// ==================== UI COMPONENTS ====================

function initializeUI() {
    // Tabs de búsqueda
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;

            // Actualizar tabs activos
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Mostrar contenido correcto
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tab}-tab`).classList.add('active');
        });
    });

    // Búsqueda por nombre
    const searchByName = document.getElementById('searchByName');
    searchByName.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const results = beachesData.filter(beach =>
            beach.nombre.toLowerCase().includes(query)
        );
        displaySearchResults(results, 'nameResults');
    });

    // Búsqueda por número
    const searchByNumber = document.getElementById('searchByNumber');
    searchByNumber.addEventListener('input', (e) => {
        const query = parseInt(e.target.value);
        if (isNaN(query)) {
            document.getElementById('numberResults').innerHTML = '';
            return;
        }
        const results = beachesData.filter(beach => beach.numero === query);
        displaySearchResults(results, 'numberResults');
    });

    // Sistema de estrellas
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value);
            currentRating = value;
            updateStars(value);
            updateRatingValue(value);
        });

        star.addEventListener('mouseenter', () => {
            const value = parseInt(star.dataset.value);
            updateStars(value);
        });
    });

    document.querySelector('.star-rating').addEventListener('mouseleave', () => {
        updateStars(currentRating);
    });

    // Contador de caracteres
    const commentText = document.getElementById('commentText');
    commentText.addEventListener('input', (e) => {
        const count = e.target.value.length;
        document.querySelector('.char-count').textContent = `${count}/500`;
    });

    // Submit rating
    document.getElementById('submitRating').addEventListener('click', submitRating);

    // Modal de comentarios
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('commentsModal').addEventListener('click', (e) => {
        if (e.target.id === 'commentsModal') {
            closeModal();
        }
    });
}

function displaySearchResults(results, containerId) {
    const container = document.getElementById(containerId);

    if (results.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 1rem;">No se encontraron resultados</p>';
        return;
    }

    container.innerHTML = results.map(beach => `
        <div class="search-result-item" onclick="selectBeach('${beach.id}')">
            <strong>#${beach.numero} - ${beach.nombre}</strong>
            <small>${beach.provincia} | Reto Playas: ${beach.puntuacionRetoPlayas}/10</small>
        </div>
    `).join('');
}

function selectBeach(beachId) {
    const beach = beachesData.find(b => b.id === beachId);
    if (!beach) return;

    selectedBeach = beach;

    // Mostrar formulario de puntuación
    document.getElementById('ratingForm').style.display = 'block';
    document.getElementById('selectedBeachName').textContent = beach.nombre;

    // Resetear formulario
    currentRating = 0;
    updateStars(0);
    updateRatingValue(0);
    document.getElementById('commentText').value = '';
    document.querySelector('.char-count').textContent = '0/500';
    document.getElementById('ratingMessage').style.display = 'none';

    // Resaltar en el mapa
    highlightBeach(beach);

    // Scroll al formulario
    document.getElementById('ratingForm').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateStars(value) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < value) {
            star.textContent = '★';
            star.classList.add('active');
        } else {
            star.textContent = '☆';
            star.classList.remove('active');
        }
    });
}

function updateRatingValue(value) {
    const points = value * 2; // Cada estrella vale 2 puntos
    document.querySelector('.rating-value').textContent = `${points}/10`;
}

async function submitRating() {
    if (!selectedBeach) return;

    if (currentRating === 0) {
        showRatingMessage('Por favor selecciona una puntuación', 'error');
        return;
    }

    const comment = document.getElementById('commentText').value.trim();
    const points = currentRating * 2;

    try {
        if (typeof db !== 'undefined') {
            const beachRef = db.collection('playas').doc(selectedBeach.id);
            const beachDoc = await beachRef.get();

            if (beachDoc.exists) {
                const data = beachDoc.data();
                const comentarios = data.comentarios || [];
                const totalVotos = (data.totalVotos || 0) + 1;
                const sumaTotal = (data.promedioUsuarios || 0) * (data.totalVotos || 0) + points;
                const nuevoPromedio = sumaTotal / totalVotos;

                comentarios.push({
                    puntuacion: points,
                    comentario: comment,
                    fecha: firebase.firestore.FieldValue.serverTimestamp()
                });

                await beachRef.update({
                    promedioUsuarios: nuevoPromedio,
                    totalVotos: totalVotos,
                    comentarios: comentarios
                });

                showRatingMessage('¡Gracias por tu puntuación!', 'success');

                // Actualizar datos locales
                await loadBeachesData();
                renderTopRatedList();

                // Resetear formulario después de 2 segundos
                setTimeout(() => {
                    currentRating = 0;
                    updateStars(0);
                    updateRatingValue(0);
                    document.getElementById('commentText').value = '';
                    document.querySelector('.char-count').textContent = '0/500';
                    selectedBeach = null;
                    document.getElementById('ratingForm').style.display = 'none';

                    // Restaurar marcadores
                    beachMarkers.forEach(marker => {
                        marker.material.color.setHex(0x0077be);
                        marker.scale.set(1, 1, 1);
                    });
                }, 2000);
            }
        } else {
            showRatingMessage('Firebase no está disponible. Por favor, configura la conexión.', 'error');
        }
    } catch (error) {
        console.error('Error guardando puntuación:', error);
        showRatingMessage('Error al guardar la puntuación. Intenta de nuevo.', 'error');
    }
}

function showRatingMessage(message, type) {
    const messageEl = document.getElementById('ratingMessage');
    messageEl.textContent = message;
    messageEl.className = `rating-message ${type}`;
    messageEl.style.display = 'block';
}

// ==================== LISTAS ====================

function renderFavoritesList() {
    const container = document.getElementById('favoritesList');
    const favorites = beachesData
        .filter(beach => beach.esFavorita)
        .sort((a, b) => b.puntuacionRetoPlayas - a.puntuacionRetoPlayas);

    if (favorites.length === 0) {
        container.innerHTML = '<p class="loading">No hay favoritas disponibles</p>';
        return;
    }

    container.innerHTML = favorites.map(beach => createBeachListItem(beach, true)).join('');
}

function renderTopRatedList() {
    const container = document.getElementById('topRatedList');
    const topRated = beachesData
        .filter(beach => beach.totalVotos > 0)
        .sort((a, b) => b.promedioUsuarios - a.promedioUsuarios)
        .slice(0, 10);

    if (topRated.length === 0) {
        container.innerHTML = '<p class="loading">Aún no hay playas puntuadas. ¡Sé el primero!</p>';
        return;
    }

    container.innerHTML = topRated.map(beach => createBeachListItem(beach, false)).join('');
}

function createBeachListItem(beach, isRetoPlayas) {
    const rating = isRetoPlayas ? beach.puntuacionRetoPlayas : beach.promedioUsuarios;
    const stars = '★'.repeat(Math.round(rating / 2));
    const votes = isRetoPlayas ? '' : `${beach.totalVotos} votos`;

    return `
        <div class="beach-item" onclick="selectBeach('${beach.id}')">
            <div class="beach-item-header">
                <span class="beach-item-number">#${beach.numero}</span>
                <span class="beach-item-name">${beach.nombre}</span>
            </div>
            <div class="beach-item-rating">
                <span class="stars">${stars}</span>
                <span class="score">${rating.toFixed(1)}/10</span>
            </div>
            <div class="beach-item-info">
                <span>📍 ${beach.provincia}</span>
                ${votes ? `<span>👥 ${votes}</span>` : ''}
                ${beach.comentarios && beach.comentarios.length > 0 ?
                    `<span style="cursor: pointer; color: var(--playas-primary);"
                     onclick="event.stopPropagation(); showComments('${beach.id}')">
                     💬 ${beach.comentarios.length} comentarios
                    </span>` : ''}
            </div>
        </div>
    `;
}

function showComments(beachId) {
    const beach = beachesData.find(b => b.id === beachId);
    if (!beach || !beach.comentarios || beach.comentarios.length === 0) return;

    document.getElementById('modalBeachName').textContent = `${beach.nombre} - Comentarios`;

    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = beach.comentarios
        .sort((a, b) => {
            // Ordenar por fecha (más recientes primero)
            const dateA = a.fecha?.toDate ? a.fecha.toDate() : new Date(a.fecha || 0);
            const dateB = b.fecha?.toDate ? b.fecha.toDate() : new Date(b.fecha || 0);
            return dateB - dateA;
        })
        .map(comment => {
            const date = comment.fecha?.toDate ? comment.fecha.toDate() : new Date(comment.fecha || Date.now());
            const dateStr = date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            const stars = '★'.repeat(Math.round(comment.puntuacion / 2));

            return `
                <div class="comment-item">
                    <div class="comment-header">
                        <span class="comment-rating">${stars} ${comment.puntuacion}/10</span>
                        <span class="comment-date">${dateStr}</span>
                    </div>
                    ${comment.comentario ? `<p class="comment-text">${comment.comentario}</p>` : ''}
                </div>
            `;
        })
        .join('');

    document.getElementById('commentsModal').classList.add('active');
}

function closeModal() {
    document.getElementById('commentsModal').classList.remove('active');
}

// Exponer funciones globales necesarias
window.selectBeach = selectBeach;
window.showComments = showComments;
