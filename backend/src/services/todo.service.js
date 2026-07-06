const supabase = require('../config/supabase');

const TodoService = {
    async getAllTodos(clientId, search = '', status = '', page, limit) {
        let query = supabase
            .from('todos')
            .select('*', { count: 'exact' })
            .eq('client_id', clientId)
            .order('created_at', { ascending: false });

        if (search) {
            query = query.ilike('title', `%${search}%`);
        }

        if (status !== '') {
            const isCompleted = status === 'true';
            query = query.eq('is_completed', isCompleted);
        }

        if (page !== undefined && limit !== undefined) {
            const parsedPage = parseInt(page, 10);
            const parsedLimit = parseInt(limit, 10);
            if (!isNaN(parsedPage) && !isNaN(parsedLimit)) {
                const from = parsedPage * parsedLimit;
                const to = from + parsedLimit - 1;
                query = query.range(from, to);
            }
        }

        const { data, error, count } = await query;
        if (error) throw error;
        return {
            data: data || [],
            total: count || 0
        };
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