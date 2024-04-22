const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Datos de ejemplo para simular una base de datos
let todos = [
   
];

// Ruta GET para obtener todas las tareas
app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

// Ruta POST para crear una nueva tarea
app.post('/todos', (req, res) => {
    const  task  = req.body.task;
    const newTodo = { id: todos.length + 1, task:task };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Ruta PUT para actualizar una tarea existente
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
    if (todoIndex !== -1) {
        todos[todoIndex].task = task;
        res.status(200).json(todos[todoIndex]);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

// Ruta DELETE para eliminar una tarea
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor HTTP Express escuchando en el puerto ${port}`);
});