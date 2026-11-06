// Estado inicial de la aplicación y datos simulados
let productos = [
    { id: 1, imagen: 'https://via.placeholder.com/35', nombre: 'Limpiadores de espuma', categoria: 'Limpiadores', tipoPiel: 'Todo tipo de piel', precio: 36.95, stock: 51, tipo: 'propios' },
    { id: 2, imagen: 'https://via.placeholder.com/35', nombre: 'Sérum de Ácido Hialurónico', categoria: 'Tratamientos', tipoPiel: 'Seca / Mixta', precio: 45.00, stock: 12, tipo: 'externos' }
];

let filtroActual = 'todos';

document.addEventListener('DOMContentLoaded', () => {
    renderizarTabla();

    // Eventos de Pestañas de Filtro
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            filtroActual = e.target.dataset.filtro;
            renderizarTabla();
        });
    });

    // Control del formulario de productos (Crear / Editar)
    document.getElementById('formProducto').addEventListener('submit', guardarProducto);
});

// --- RENDERIZADO DE TABLA ---
function renderizarTabla() {
    const tbody = document.getElementById('tbodyProductos');
    tbody.innerHTML = '';

    const productosFiltrados = productos.filter(p => {
        if (filtroActual === 'todos') return true;
        return p.tipo === filtroActual;
    });

    if (productosFiltrados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#94a3b8; padding: 25px;">No hay productos registrados en esta categoría.</td></tr>`;
        return;
    }

    productosFiltrados.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.imagen}" alt="${p.nombre}" class="product-img"></td>
            <td><strong>${p.nombre}</strong></td>
            <td>${p.categoria}</td>
            <td>${p.tipoPiel}</td>
            <td>$${Number(p.precio).toFixed(2)}</td>
            <td><span class="stock-badge">${p.stock} unidades</span></td>
            <td>
                <button class="btn-edit" onclick="abrirModalEditar(${p.id})">✏️ Editar</button>
                <button class="btn-view" onclick="verProducto(${p.id})">👁️ Ver</button>
                <button class="btn-delete" onclick="eliminarProducto(${p.id})">🗑️ Borrar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- GESTIÓN DE MODALES DE PRODUCTOS ---
function abrirModalCrear() {
    document.getElementById('formProducto').reset();
    document.getElementById('productoId').value = '';
    document.getElementById('modalTitulo').innerText = 'Agregar Nuevo Producto';
    document.getElementById('modalFormulario').style.display = 'flex';
}

function abrirModalEditar(id) {
    const p = productos.find(prod => prod.id === id);
    if (!p) return;

    document.getElementById('productoId').value = p.id;
    document.getElementById('nombre').value = p.nombre;
    document.getElementById('categoria').value = p.categoria;
    document.getElementById('tipoPiel').value = p.tipoPiel;
    document.getElementById('precio').value = p.precio;
    document.getElementById('stock').value = p.stock;
    document.getElementById('tipo').value = p.tipo;

    document.getElementById('modalTitulo').innerText = 'Editar Producto';
    document.getElementById('modalFormulario').style.display = 'flex';
}

function guardarProducto(e) {
    e.preventDefault();
    const id = document.getElementById('productoId').value;
    
    const nuevoProducto = {
        id: id ? parseInt(id) : Date.now(),
        imagen: 'https://via.placeholder.com/35',
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        tipoPiel: document.getElementById('tipoPiel').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value),
        tipo: document.getElementById('tipo').value
    };

    if (id) {
        const index = productos.findIndex(p => p.id === parseInt(id));
        productos[index] = nuevoProducto;
    } else {
        productos.push(nuevoProducto);
    }

    cerrarModal('modalFormulario');
    renderizarTabla();
}

function verProducto(id) {
    const p = productos.find(prod => prod.id === id);
    if (!p) return;
    alert(`🔍 DETALLES DE SKU:\n\n• ID: ${p.id}\n• Nombre: ${p.nombre}\n• Categoría: ${p.categoria}\n• Tipo de Piel: ${p.tipoPiel}\n• Precio: $${p.precio}\n• Stock: ${p.stock} unidades\n• Clasificación: ${p.tipo.toUpperCase()}`);
}

function eliminarProducto(id) {
    if (confirm('¿Estás seguro de eliminar este producto del inventario?')) {
        productos = productos.filter(p => p.id !== id);
        renderizarTabla();
    }
}

function cerrarModal(idModal) {
    document.getElementById(idModal).style.display = 'none';
}

// --- BOTONES FUNCIONALES DE LA BARRA SUPERIOR Y ACCESOS RÁPIDOS ---
function irInicio() {
    window.location.href = "PaginaPrincipal.html";
}

function irCatalogo() {
    alert("Redirigiendo al Catálogo público de Skiniverse...");
}

function irPrivacidad() {
    alert("Abriendo políticas de Privacidad y Términos de uso...");
}

function toggleMenuAdmin() {
    alert("Opciones de Administrador activas (Panel de control actual).");
}

function abrirCarrito() {
    alert("🛒 Tu carrito de compras de prueba está actualmente vacío (0 artículos).");
}

function verPedidos() {
    alert("📦 Abriendo módulo de gestión de Pedidos de clientes...");
}

function verUsuarios() {
    alert("👥 Abriendo panel de control y permisos de Usuarios...");
}

function cerrarSesion() {
    if (confirm("¿Estás seguro de que deseas cerrar la sesión de administrador?")) {
        window.location.href = "Login.html";
    }
}