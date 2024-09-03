const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

// Crear la aplicación Express
const app = express();

// Configurar middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(process.env.DB_CONNECTION_STRING || './miBaseDeDatos.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos SQLite:', err);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Crear tablas si no existen
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL
    )`);
});

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ message: 'No se proporcionó un token.' });
    }
    const jwtSecret = process.env.JWT_SECRET; // Obtiene el secreto JWT de la variable de entorno
    jwt.verify(token.split(' ')[1], jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Token no válido.' });
        }
        req.userId = decoded.id;
        next();
    });
};

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error al iniciar sesión' });
        }
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ token: null, message: 'Contraseña incorrecta' });
        }

        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: 86400 });  // 24 horas
        res.status(200).json({ token });
    });
});

// Obtener todos los ítems del inventario (protegido con JWT)
app.get('/inventory', verifyToken, (req, res) => {
    db.all(`SELECT * FROM inventory`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener el inventario' });
        }
        res.json(rows);
    });
});

// Añadir un nuevo ítem al inventario (protegido con JWT)
app.post('/inventory', verifyToken, (req, res) => {
    const { name, quantity, price } = req.body;

    db.run(`INSERT INTO inventory (name, quantity, price) VALUES (?, ?, ?)`, [name, quantity, price], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al añadir el ítem' });
        }
        res.status(201).json({ id: this.lastID, name, quantity, price });
    });
});

// Actualizar un ítem del inventario (protegido con JWT)
app.put('/inventory/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    db.run(`UPDATE inventory SET name = ?, quantity = ?, price = ? WHERE id = ?`, [name, quantity, price, id], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el ítem' });
        }
        res.json({ id, name, quantity, price });
    });
});

// Eliminar un ítem del inventario (protegido con JWT)
app.delete('/inventory/:id', verifyToken, (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM inventory WHERE id = ?`, [id], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar el ítem' });
        }
        res.status(204).send();
    });
});

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Inventarios');
});

// Iniciar el servidor si no se está ejecutando en un entorno Serverless
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}

// Exportar la aplicación para usarla en Serverless
module.exports = app;