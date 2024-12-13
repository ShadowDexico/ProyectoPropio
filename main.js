// Datos simulados de rutas y tiempos
const rutas = [
    { id: 1, nombre: "Ruta 1", origen: "Centro", destino: "Norte", duracion: 30 },
    { id: 2, nombre: "Ruta 2", origen: "Sur", destino: "Este", duracion: 45 },
    { id: 3, nombre: "Ruta 3", origen: "Oeste", destino: "Centro", duracion: 31 },
    { id: 4, nombre: "Ruta 4", origen: "Norte", destino: "Centro", duracion: 20 },
    { id: 5, nombre: "Ruta 5", origen: "Este", destino: "Mercado", duracion: 45 },
    { id: 6, nombre: "Ruta 6", origen: "Mercado", destino: "Centro", duracion: 45 },
    { id: 7, nombre: "Ruta 7", origen: "Mercado", destino: "Sur", duracion: 20 },
];

// Función para poblar el combo box
function poblarComboBox() {
    const selectRuta = document.getElementById('selectRuta');
    selectRuta.innerHTML = '<option value="">Seleccione una ruta</option>';
    rutas.forEach(ruta => {
        const option = document.createElement('option');
        option.value = ruta.id;
        option.textContent = ruta.nombre;
        selectRuta.appendChild(option);
    });
}

// Función para buscar rutas
function buscarRutas() {
    const origen = document.getElementById('origen').value.toLowerCase();
    const destino = document.getElementById('destino').value.toLowerCase();
    const rutasEncontradas = rutas.filter(ruta => 
        ruta.origen.toLowerCase().includes(origen) && ruta.destino.toLowerCase().includes(destino)
    );
    mostrarRutas(rutasEncontradas);
}

// Función para mostrar rutas encontradas
function mostrarRutas(rutasEncontradas) {
    const contenedor = document.getElementById('rutasEncontradas');
    contenedor.innerHTML = '';
    if (rutasEncontradas.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron rutas.</p>';
        return;
    }
    rutasEncontradas.forEach(ruta => {
        const rutaElement = document.createElement('div');
        rutaElement.classList.add('ruta');
        rutaElement.innerHTML = `
            <h3>${ruta.nombre}</h3>
            <p>Origen: ${ruta.origen}</p>
            <p>Destino: ${ruta.destino}</p>
            <p>Duración estimada: ${ruta.duracion} minutos</p>
        `;
        contenedor.appendChild(rutaElement);
    });
}

// Función para mostrar información en tiempo real
function mostrarTiempoReal() {
    const rutaId = document.getElementById('selectRuta').value;
    const infoContainer = document.getElementById('infoTiempoReal');
    if (!rutaId) {
        infoContainer.innerHTML = '<p>Seleccione una ruta para ver información en tiempo real.</p>';
        return;
    }
    const ruta = rutas.find(r => r.id === parseInt(rutaId));
    const tiempoEspera = Math.floor(Math.random() * 15) + 1; // Tiempo de espera aleatorio entre 1 y 15 minutos
    const proximaLlegada = new Date(Date.now() + tiempoEspera * 60000);
    infoContainer.innerHTML = `
        <h3>${ruta.nombre}</h3>
        <p>Tiempo de espera estimado: ${tiempoEspera} minutos</p>
        <p>Próxima llegada: ${proximaLlegada.toLocaleTimeString()}</p>
    `;
}

// Poblar el combo box al cargar la página
poblarComboBox();

// Event listeners
document.getElementById('buscarRuta').addEventListener('click', buscarRutas);
document.getElementById('selectRuta').addEventListener('change', mostrarTiempoReal);

// Actualizar información en tiempo real cada minuto
setInterval(mostrarTiempoReal, 60000);

