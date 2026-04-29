'use strict';

/* =========================
   ELEMENTOS
========================= */

const formTarea = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const listaTareas = document.getElementById('lista-tareas');
const mensajeEstado = document.getElementById('mensaje-estado');
const btnLimpiar = document.getElementById('btn-limpiar');
const themeBtns = document.querySelectorAll('[data-theme]');

/* =========================
   ESTADO
========================= */

let tareas = [];

/* =========================
   CREAR ELEMENTO
========================= */

function crearElementoTarea(tarea) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.id = tarea.id;

  if (tarea.completada) {
    li.classList.add('task-item--completed');
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-item__checkbox';
  checkbox.checked = tarea.completada;

  const span = document.createElement('span');
  span.className = 'task-item__text';
  span.textContent = tarea.texto;

  const btnEliminar = document.createElement('button');
  btnEliminar.className = 'btn btn--danger btn--small';
  btnEliminar.textContent = '🗑️';

  const divAcciones = document.createElement('div');
  divAcciones.className = 'task-item__actions';
  divAcciones.appendChild(btnEliminar);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(divAcciones);

  checkbox.addEventListener('change', () => toggleTarea(tarea.id));
  btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

  return li;
}

/* =========================
   RENDER
========================= */

function renderizarTareas() {
  listaTareas.innerHTML = '';

  if (tareas.length === 0) {
    const div = document.createElement('div');
    div.className = 'empty-state';

    const p = document.createElement('p');
    p.textContent = '🎉 No hay tareas. ¡Agrega una!';

    div.appendChild(p);
    listaTareas.appendChild(div);
    return;
  }

  tareas.forEach(t => {
    listaTareas.appendChild(crearElementoTarea(t));
  });
}

/* =========================
   MENSAJES
========================= */

function mostrarMensaje(texto, tipo = 'success') {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = `mensaje mensaje--${tipo}`;
  mensajeEstado.classList.remove('oculto');

  setTimeout(() => {
    mensajeEstado.classList.add('oculto');
  }, 3000);
}

/* =========================
   CRUD
========================= */

function cargarTareas() {
  tareas = TareaStorage.getAll();
  renderizarTareas();
}

function agregarTarea(texto) {
  if (!texto.trim()) {
    mostrarMensaje('Texto vacío', 'error');
    return;
  }

  const nueva = TareaStorage.crear(texto);

  tareas = TareaStorage.getAll();
  renderizarTareas();

  mostrarMensaje(`Tarea "${nueva.texto}" agregada`);
}

function toggleTarea(id) {
  TareaStorage.toggleCompletada(id);
  tareas = TareaStorage.getAll();
  renderizarTareas();
}

function eliminarTarea(id) {
  const tarea = tareas.find(t => t.id === id);
  if (!confirm(`¿Eliminar "${tarea.texto}"?`)) return;

  TareaStorage.eliminar(id);
  tareas = TareaStorage.getAll();
  renderizarTareas();

  mostrarMensaje('Tarea eliminada');
}

function limpiarTodo() {
  if (tareas.length === 0) return;
  if (!confirm('¿Eliminar todas las tareas?')) return;

  TareaStorage.limpiarTodo();
  tareas = [];
  renderizarTareas();

  mostrarMensaje('Todas eliminadas');
}

/* =========================
   TEMA
========================= */

function aplicarTema(nombreTema) {
  if (nombreTema === 'oscuro') {
    document.documentElement.style.setProperty('--bg-primary', '#1a1a2e');
    document.documentElement.style.setProperty('--card-bg', '#16213e');
  } else {
    document.documentElement.style.setProperty('--bg-primary', '#f5f5f5');
    document.documentElement.style.setProperty('--card-bg', '#ffffff');
  }

  themeBtns.forEach(btn => {
    btn.classList.toggle('theme-btn--active', btn.dataset.theme === nombreTema);
  });

  TemaStorage.setTema(nombreTema);
}

/* =========================
   EVENTOS
========================= */

formTarea.addEventListener('submit', (e) => {
  e.preventDefault();
  agregarTarea(inputTarea.value);
  inputTarea.value = '';
});

btnLimpiar.addEventListener('click', limpiarTodo);

themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    aplicarTema(btn.dataset.theme);
  });
});

/* =========================
   INICIO
========================= */

const temaGuardado = TemaStorage.getTema();
aplicarTema(temaGuardado);

cargarTareas();

if (tareas.length === 0) {
  mostrarMensaje('👋 Bienvenido! Agrega tu primera tarea');
}