let filtroActual = 'todos';

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('skiniverse_productos')) {
        const productosIniciales = [
            { id: 1, imagen: 'https://via.placeholder.com/200', nombre: 'Limpiadores de espuma', categoria: 'Limpiadores', tipoPiel: 'Todo tipo de piel', activos: 'Espuma Facial', precio: 37.00, stock: 51 },
            { id: 2, imagen: 'https://via.placeholder.com/200', nombre: 'Sérum de Ácido Hialurónico', categoria: 'Tratamientos', tipoPiel: 'Seca / Mixta', activos: 'Ácido hialurónico', precio: 45.00, stock: 12 }
        ];
        localStorage.setItem('skiniverse_productos', JSON.stringify(productosIniciales));
    }
    actualizarContadores();
    poblarSelectorCategorias();
    renderizarCatalogo();
});

function poblarSelectorCategorias() {
    const select = document.getElementById('selectCategoria');
    let productos = JSON.parse(localStorage.getItem('skiniverse_productos')) || [];
    
    const categoriasUnicas = [...new Set(productos.map(p => p.categoria ? p.categoria.trim() : 'General'))];

    let html = `<option value="" disabled selected>Productos por Categoria</option>`;
    categoriasUnicas.forEach(cat => {
        html += `<option value="${cat}">${cat}</option>`;
    });

    select.innerHTML = html;
}

function seleccionarTodos() {
    filtroActual = 'todos';
    document.getElementById('btnTodos').classList.add('active');
    document.getElementById('selectCategoria').value = "";
    renderizarCatalogo();
}

function seleccionarCategoriaDesplegable() {
    const select = document.getElementById('selectCategoria');
    filtroActual = select.value;
    document.getElementById('btnTodos').classList.remove('active');
    renderizarCatalogo();
}

function renderizarCatalogo() {
    const grid = document.getElementById('gridProductos');
    if (!grid) return;
    grid.innerHTML = '';

    let productos = JSON.parse(localStorage.getItem('skiniverse_productos')) || [];
    let favoritos = JSON.parse(localStorage.getItem('skiniverse_favoritos')) || [];

    const filtrados = productos.filter(p => {
        if (filtroActual === 'todos') return true;
        return (p.categoria && p.categoria.trim() === filtroActual);
    });

    if (filtrados.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--texto-secundario); padding: 40px;">No hay productos disponibles en esta vista.</p>`;
        return;
    }

    filtrados.forEach(p => {
        const esFav = favoritos.some(fav => fav.id == p.id);
        grid.innerHTML += `
            <div class="product-card">
                <div class="product-img-box">
                    <button type="button" class="fav-btn" onclick="toggleFavorito(${p.id})">${esFav ? '❤️' : '🤍'}</button>
                    <img src="${p.imagen}" alt="${p.nombre}">
                </div>
                <div class="product-body">
                    <span class="product-category">${p.categoria || 'General'}</span>
                    <h3 class="product-title">${p.nombre}</h3>
                    <p class="product-skin">Para: ${p.tipoPiel}</p>
                </div>
                <div class="product-footer">
                    <span class="product-price">$${Number(p.precio).toFixed(2)}</span>
                    <div>
                        <a href="DetalleUsuario.html?id=${p.id}" class="btn-detail">Ver</a>
                        <button type="button" class="btn-cart" onclick="agregarCarrito(${p.id})">🛒 Añadir</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function toggleFavorito(id) {
    let productos = JSON.parse(localStorage.getItem('skiniverse_productos')) || [];
    let producto = productos.find(p => p.id == id);
    let favoritos = JSON.parse(localStorage.getItem('skiniverse_favoritos')) || [];

    let index = favoritos.findIndex(fav => fav.id == id);
    if (index !== -1) {
        favoritos.splice(index, 1);
    } else {
        if (producto) favoritos.push(producto);
    }

    localStorage.setItem('skiniverse_favoritos', JSON.stringify(favoritos));
    actualizarContadores();
    renderizarCatalogo();
}

function agregarCarrito(id) {
    let productos = JSON.parse(localStorage.getItem('skiniverse_productos')) || [];
    let producto = productos.find(p => p.id == id);
    if (producto) {
        let carrito = JSON.parse(localStorage.getItem('skiniverse_carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('skiniverse_carrito', JSON.stringify(carrito));
        actualizarContadores();
        alert(`¡"${producto.nombre}" fue añadido al carrito con éxito!`);
    }
}

function actualizarContadores() {
    let carrito = JSON.parse(localStorage.getItem('skiniverse_carrito')) || [];
    let favoritos = JSON.parse(localStorage.getItem('skiniverse_favoritos')) || [];
    document.getElementById('cartCount').innerText = carrito.length;
    document.getElementById('favCount').innerText = favoritos.length;
}

// Función para mostrar el modal de Favoritos con botón de eliminar
function abrirFavoritos() {
    const lista = document.getElementById('listaFavoritos');
    lista.innerHTML = '';
    let favoritos = JSON.parse(localStorage.getItem('skiniverse_favoritos')) || [];

    if (favoritos.length === 0) {
        lista.innerHTML = `<p style="text-align: center; color: var(--texto-secundario); padding: 15px;">No tienes productos en favoritos.</p>`;
    } else {
        favoritos.forEach((item, index) => {
            lista.innerHTML += `
                <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--borde-suave);">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${item.imagen}" width="35" height="35" style="object-fit: contain; border-radius: 4px;">
                        <div>
                            <strong style="color: var(--marron-oscuro); display: block; font-size: 0.95rem;">${item.nombre}</strong>
                            <span style="color: var(--texto-secundario); font-size: 0.85rem;">$${Number(item.precio).toFixed(2)}</span>
                        </div>
                    </div>
                    <button type="button" onclick="eliminarDeFavoritos(${index})" title="Quitar de favoritos" style="background: #fee2e2; border: 1px solid #fecaca; color: #991b1b; padding: 5px 8px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; transition: background 0.2s;">
                        🗑️ Quitar
                    </button>
                </div>
            `;
        });
    }
    document.getElementById('modalFavoritos').style.display = 'flex';
}

// Nueva función para eliminar un elemento de favoritos por su posición (índice)
function eliminarDeFavoritos(index) {
    let favoritos = JSON.parse(localStorage.getItem('skiniverse_favoritos')) || [];
    
    // Eliminamos el producto del arreglo de favoritos
    favoritos.splice(index, 1);
    
    // Actualizamos el localStorage
    localStorage.setItem('skiniverse_favoritos', JSON.stringify(favoritos));
    
    // Actualizamos el contador general, la grilla del catálogo (para cambiar el corazón ❤️ a 🤍) y refrescamos el modal
    actualizarContadores();
    renderizarCatalogo();
    abrirFavoritos();
}

function abrirCarrito() {
    const lista = document.getElementById('listaCarrito');
    lista.innerHTML = '';
    let carrito = JSON.parse(localStorage.getItem('skiniverse_carrito')) || [];
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = `<p style="text-align: center; color: var(--texto-secundario); padding: 15px;">Tu carrito está vacío.</p>`;
    } else {
        carrito.forEach((item, index) => {
            total += item.precio;
            lista.innerHTML += `
                <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--borde-suave);">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${item.imagen}" width="35" height="35" style="object-fit: contain; border-radius: 4px;">
                        <div>
                            <strong style="color: var(--marron-oscuro); display: block; font-size: 0.95rem;">${item.nombre}</strong>
                            <span style="color: var(--texto-secundario); font-size: 0.85rem;">$${Number(item.precio).toFixed(2)}</span>
                        </div>
                    </div>
                    <button type="button" onclick="eliminarDelCarrito(${index})" title="Eliminar producto" style="background: #fee2e2; border: 1px solid #fecaca; color: #991b1b; padding: 5px 8px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; transition: background 0.2s;">
                        🗑️ Eliminar
                    </button>
                </div>
            `;
        });
    }
    document.getElementById('cartTotal').innerText = total.toFixed(2);
    document.getElementById('modalCarrito').style.display = 'flex';
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('skiniverse_carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('skiniverse_carrito', JSON.stringify(carrito));
    actualizarContadores();
    abrirCarrito(); // Refresca el modal del carrito al instante
}
function abrirCheckout() {
    let carrito = JSON.parse(localStorage.getItem('skiniverse_carrito')) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    cerrarModal('modalCarrito');
    document.getElementById('modalCheckout').style.display = 'flex';
}

function procesarPago(e) {
    e.preventDefault();
    alert("¡Pago procesado con éxito! Gracias por tu compra en Skiniverse.");
    localStorage.removeItem('skiniverse_carrito');
    actualizarContadores();
    cerrarModal('modalCheckout');
}

function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
}

function cerrarSesion() {
    if (confirm("¿Estás segura de que deseas cerrar sesión?")) {
        window.location.href = "Login.html";
    }
}