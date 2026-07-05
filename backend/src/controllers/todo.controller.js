const TodoService = require('../services/todo.service');

const TodoController = {
  getTodos: async (req, res) => {
    try {
      const clientId = req.headers['x-client-id'];
      if (!clientId) return res.status(400).json({ message: 'Thiếu client_id' });

      const { search, status } = req.query;
      const todos = await TodoService.getAllTodos(clientId, search, status);
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  },

  createTodo: async (req, res) => {
    try {
      const clientId = req.headers['x-client-id'];
      const { title } = req.body;

      if (!clientId) return res.status(400).json({ message: 'Thiếu client_id' });
      if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'Tên công việc không được để trống' });
      }

      const newTodo = await TodoService.createTodo(clientId, title);
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  },

  updateTodo: async (req, res) => {
    try {
      const clientId = req.headers['x-client-id'];
      const { id } = req.params;
      const { title, is_completed } = req.body;

      if (!clientId) return res.status(400).json({ message: 'Thiếu client_id' });

      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (is_completed !== undefined) updateData.is_completed = is_completed;

      const updatedTodo = await TodoService.updateTodo(id, clientId, updateData);
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const clientId = req.headers['x-client-id'];
      const { id } = req.params;

      if (!clientId) return res.status(400).json({ message: 'Thiếu client_id' });

      await TodoService.deleteTodo(id, clientId);
      res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  }
};

module.exports = TodoController;