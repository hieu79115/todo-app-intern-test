require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todo.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/todos', todoRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
}); 