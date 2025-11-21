// Datos de las playas de Costa Rica
// Coordenadas aproximadas de cada playa

const playasCostaRica = [
    // Guanacaste
    {
        id: "playa-001",
        numero: 1,
        nombre: "Playa Conchal",
        provincia: "Guanacaste",
        ubicacion: { lat: 10.3897, lng: -85.7936 },
        puntuacionRetoPlayas: 9,
        esFavorita: true
    },
    {
        id: "playa-002",
        numero: 2,
        nombre: "Playa Flamingo",
        provincia: "Guanacaste",
        ubicacion: { lat: 10.4389, lng: -85.7867 },
        puntuacionRetoPlayas: 8,
        esFavorita: true
    },
    {
        id: "playa-003",
        numero: 3,
        nombre: "Playa Tamarindo",
        provincia: "Guanacaste",
        ubicacion: { lat: 10.2989, lng: -85.8394 },
        puntuacionRetoPlayas: 7,
        esFavorita: false
    },
    {
        id: "playa-004",
        numero: 4,
        nombre: "Playa Grande",
        provincia: "Guanacaste",
        ubicacion: { lat: 10.3489, lng: -85.8506 },
        puntuacionRetoPlayas: 8,
        esFavorita: true
    },
    {
        id: "playa-005",
        numero: 5,
        nombre: "Playa Hermosa (Guanacaste)",
        provincia: "Guanacaste",
        ubicacion: { lat: 10.5739, lng: -85.6703 },
        puntuacionRetoPlayas: 7,
        esFavorita: false
    },
    {
        id: "playa-006",
        numero: 6,
        nombre: "Playa del Coco",
        provincia: "Guanacaste",
        ubicacion: { lat: 10.5508, lng: -85.7006 },
        puntuacionRetoPlayas: 6,
        esFavorita: false
    },
    {
        id: "playa-007",
        numero: 7,
        nombre: "Playa Ocotal",
        provincia: "Guanacaste",
        ubicacion: { lat: 10.5428, lng: -85.7150 },
        puntuacionRetoPlayas: 8,
        esFavorita: true
    },
    {
        id: "playa-008",
        numero: 8,
        nombre: "Playa Nosara",
        provincia: "Guanacaste",
        ubicacion: { lat: 9.9764, lng: -85.6531 },
        puntuacionRetoPlayas: 9,
        esFavorita: true
    },
    {
        id: "playa-009",
        numero: 9,
        nombre: "Playa Sámara",
        provincia: "Guanacaste",
        ubicacion: { lat: 10.0314, lng: -85.5286 },
        puntuacionRetoPlayas: 7,
        esFavorita: false
    },
    {
        id: "playa-010",
        numero: 10,
        nombre: "Playa Carrillo",
        provincia: "Guanacaste",
        ubicacion: { lat: 9.8917, lng: -85.4836 },
        puntuacionRetoPlayas: 8,
        esFavorita: true
    },

    // Puntarenas
    {
        id: "playa-011",
        numero: 11,
        nombre: "Playa Manuel Antonio",
        provincia: "Puntarenas",
        ubicacion: { lat: 9.3856, lng: -84.1458 },
        puntuacionRetoPlayas: 10,
        esFavorita: true
    },
    {
        id: "playa-012",
        numero: 12,
        nombre: "Playa Espadilla",
        provincia: "Puntarenas",
        ubicacion: { lat: 9.3914, lng: -84.1483 },
        puntuacionRetoPlayas: 8,
        esFavorita: true
    },
    {
        id: "playa-013",
        numero: 13,
        nombre: "Playa Hermosa (Puntarenas)",
        provincia: "Puntarenas",
        ubicacion: { lat: 9.6000, lng: -84.6500 },
        puntuacionRetoPlayas: 7,
        esFavorita: false
    },
    {
        id: "playa-014",
        numero: 14,
        nombre: "Playa Jacó",
        provincia: "Puntarenas",
        ubicacion: { lat: 9.6136, lng: -84.6289 },
        puntuacionRetoPlayas: 6,
        esFavorita: false
    },
    {
        id: "playa-015",
        numero: 15,
        nombre: "Playa Montezuma",
        provincia: "Puntarenas",
        ubicacion: { lat: 9.6547, lng: -85.0711 },
        puntuacionRetoPlayas: 9,
        esFavorita: true
    },
    {
        id: "playa-016",
        numero: 16,
        nombre: "Playa Santa Teresa",
        provincia: "Puntarenas",
        ubicacion: { lat: 9.6433, lng: -85.1708 },
        puntuacionRetoPlayas: 9,
        esFavorita: true
    },
    {
        id: "playa-017",
        numero: 17,
        nombre: "Playa Mal País",
        provincia: "Puntarenas",
        ubicacion: { lat: 9.6192, lng: -85.1561 },
        puntuacionRetoPlayas: 8,
        esFavorita: false
    },
    {
        id: "playa-018",
        numero: 18,
        nombre: "Playa Uvita",
        provincia: "Puntarenas",
        ubicacion: { lat: 9.1478, lng: -83.7369 },
        puntuacionRetoPlayas: 9,
        esFavorita: true
    },
    {
        id: "playa-019",
        numero: 19,
        nombre: "Playa Dominical",
        provincia: "Puntarenas",
        ubicacion: { lat: 9.2486, lng: -83.8581 },
        puntuacionRetoPlayas: 7,
        esFavorita: false
    },
    {
        id: "playa-020",
        numero: 20,
        nombre: "Playa Tambor",
        provincia: "Puntarenas",
        ubicacion: { lat: 9.7358, lng: -85.0117 },
        puntuacionRetoPlayas: 7,
        esFavorita: false
    },

    // Limón
    {
        id: "playa-021",
        numero: 21,
        nombre: "Playa Puerto Viejo",
        provincia: "Limón",
        ubicacion: { lat: 9.6536, lng: -82.7583 },
        puntuacionRetoPlayas: 9,
        esFavorita: true
    },
    {
        id: "playa-022",
        numero: 22,
        nombre: "Playa Cocles",
        provincia: "Limón",
        ubicacion: { lat: 9.6414, lng: -82.7386 },
        puntuacionRetoPlayas: 8,
        esFavorita: true
    },
    {
        id: "playa-023",
        numero: 23,
        nombre: "Playa Chiquita",
        provincia: "Limón",
        ubicacion: { lat: 9.6203, lng: -82.7214 },
        puntuacionRetoPlayas: 8,
        esFavorita: false
    },
    {
        id: "playa-024",
        numero: 24,
        nombre: "Playa Manzanillo",
        provincia: "Limón",
        ubicacion: { lat: 9.6281, lng: -82.6514 },
        puntuacionRetoPlayas: 9,
        esFavorita: true
    },
    {
        id: "playa-025",
        numero: 25,
        nombre: "Playa Cahuita",
        provincia: "Limón",
        ubicacion: { lat: 9.7325, lng: -82.8433 },
        puntuacionRetoPlayas: 8,
        esFavorita: true
    },
    {
        id: "playa-026",
        numero: 26,
        nombre: "Playa Negra (Limón)",
        provincia: "Limón",
        ubicacion: { lat: 9.7542, lng: -82.8569 },
        puntuacionRetoPlayas: 7,
        esFavorita: false
    },
    {
        id: "playa-027",
        numero: 27,
        nombre: "Playa Punta Uva",
        provincia: "Limón",
        ubicacion: { lat: 9.6136, lng: -82.6947 },
        puntuacionRetoPlayas: 10,
        esFavorita: true
    },
    {
        id: "playa-028",
        numero: 28,
        nombre: "Playa Tortuguero",
        provincia: "Limón",
        ubicacion: { lat: 10.5392, lng: -83.5056 },
        puntuacionRetoPlayas: 8,
        esFavorita: true
    }
];

// Coordenadas aproximadas del centro de cada provincia para el mapa 3D
const provinciasCostaRica = {
    "Guanacaste": { lat: 10.4, lng: -85.4, color: 0x2d5a3d },
    "Puntarenas": { lat: 9.5, lng: -84.5, color: 0x3d7a52 },
    "Limón": { lat: 10.0, lng: -83.0, color: 0x4a8c5f },
    "San José": { lat: 9.93, lng: -84.08, color: 0x5a9c6f },
    "Alajuela": { lat: 10.02, lng: -84.21, color: 0x6aac7f },
    "Cartago": { lat: 9.86, lng: -83.92, color: 0x7abc8f },
    "Heredia": { lat: 10.00, lng: -84.12, color: 0x8acc9f }
};

// Geometría simplificada de Costa Rica para el mapa 3D
// Coordenadas de los bordes aproximados del país
const costaRicaBorders = [
    // Frontera con Nicaragua (Norte)
    { lat: 11.22, lng: -85.86 },
    { lat: 11.22, lng: -85.5 },
    { lat: 11.22, lng: -85.0 },
    { lat: 11.0, lng: -84.5 },
    { lat: 10.95, lng: -84.0 },
    { lat: 10.92, lng: -83.65 },

    // Costa Caribeña (Este)
    { lat: 10.5, lng: -83.03 },
    { lat: 10.0, lng: -83.03 },
    { lat: 9.5, lng: -82.85 },
    { lat: 9.2, lng: -82.60 },

    // Frontera con Panamá (Sur)
    { lat: 9.0, lng: -82.87 },
    { lat: 8.65, lng: -82.95 },
    { lat: 8.45, lng: -83.03 },

    // Costa Pacífica (Oeste)
    { lat: 8.40, lng: -83.20 },
    { lat: 8.50, lng: -83.50 },
    { lat: 8.60, lng: -83.70 },
    { lat: 9.00, lng: -84.30 },
    { lat: 9.50, lng: -84.60 },
    { lat: 10.00, lng: -85.20 },
    { lat: 10.50, lng: -85.70 },
    { lat: 10.90, lng: -85.90 },
    { lat: 11.22, lng: -85.86 }
];
