const supabase = require('../config/supabase');

const TodoService = {
    async getAllTodos(clientId, search = '', status = '') {
        let query = supabase
            .from('todos')
            .select('*')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false });

        if (search) {
            query = query.ilike('title', `%${search}%`);
        }

        if (status !== '') {
            const isCompleted = status === 'true';
            query = query.eq('is_completed', isCompleted);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    async createTodo(clientId, title) {
        const { data, error } = await supabase
            .from('todos')
            .insert([{ title, client_id: clientId, is_completed: false }])
            .select();

        if (error) throw error;
        return data[0];
    },

    async updateTodo(id, clientId, updateData) {
        updateData.updated_at = new Date();

        const { data, error } = await supabase
            .from('todos')
            .update(updateData)
            .eq('id', id)
            .eq('client_id', clientId)
            .select();

        if (error) throw error;
        return data[0];
    },

    async deleteTodo(id, clientId) {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id)
            .eq('client_id', clientId);

        if (error) throw error;
        return true;
    }
};

module.exports = TodoService;