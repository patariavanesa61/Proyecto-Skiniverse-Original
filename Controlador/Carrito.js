// Arreglo para almacenar los productos del carrito
let carrito = [];

// Cargar del localStorage si ya existe información previa
document.addEventListener('DOMContentLoaded', () => {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }
});

// Función para agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio) {
  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find(item => item.id === id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  guardarYActualizar();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarYActualizar();
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
  carrito = [];
  guardarYActualizar();
}

// Guardar en localStorage y refrescar la vista
function guardarYActualizar() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

// Actualizar el DOM (lo que ve el usuario)
function actualizarCarrito() {
  const listaElemento = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total-carrito');
  
  listaElemento.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.nombre} (x${item.cantidad}) - $${subtotal.toLocaleString()}</span>
      <button onclick="eliminarDelCarrito(${item.id})">❌</button>
    `;
    listaElemento.appendChild(li);
  });

  totalElemento.textContent = total.toLocaleString();
}
