import { useState, useEffect } from 'react';
import { 
  Container, Box, Paper, Snackbar, Alert, LinearProgress 
} from '@mui/material';

import todoApi from '../api/todoApi';
import Header from '../components/Header';
import TodoToolbar from '../components/TodoToolbar';
import TodoTable from '../components/TodoTable';
import TodoDialog from '../components/TodoDialog';

const TodoBoard = ({ themeMode, onThemeToggle }) => {
  // Todo States
  const [todos, setTodos] = useState([]);
  const [totalTodos, setTotalTodos] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // Pagination States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Wrappers to handle page reset when filters change
  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    setPage(0);
  };

  const handleStatusFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
    setPage(0);
  };

  // UX states
  const [isFetching, setIsFetching] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' | 'edit'
  const [editingTodo, setEditingTodo] = useState(null);

  // Toast handler
  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  // Fetch todos from API using todoApi service
  const fetchTodos = async (searchQuery = search, statusQuery = statusFilter, currentPage = page, currentRowsPerPage = rowsPerPage) => {
    setIsFetching(true);
    try {
      const apiStatus = statusQuery === 'completed' ? 'true' : statusQuery === 'active' ? 'false' : '';
      const response = await todoApi.getAll({
        search: searchQuery,
        status: apiStatus,
        page: currentPage,
        limit: currentRowsPerPage
      });
      setTodos(response.data.data);
      setTotalTodos(response.data.total);
    } catch (error) {
      showToast('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại!', 'error');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  // Debounced API fetch when search, statusFilter, page, or rowsPerPage changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTodos(search, statusFilter, page, rowsPerPage);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, statusFilter, page, rowsPerPage]);

  // CRUD actions using todoApi service
  const handleOpenAddDialog = () => {
    setDialogMode('add');
    setEditingTodo(null);
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (todo) => {
    setDialogMode('edit');
    setEditingTodo(todo);
    setDialogOpen(true);
  };

  const handleDialogSubmit = async (title) => {
    setIsActionLoading(true);
    try {
      if (dialogMode === 'add') {
        await todoApi.create(title);
        showToast('Thêm công việc thành công!', 'success');
        if (page === 0) {
          await fetchTodos(search, statusFilter, 0, rowsPerPage);
        } else {
          setPage(0);
        }
      } else {
        await todoApi.update(editingTodo.id, { 
          title, 
          is_completed: editingTodo.is_completed 
        });
        showToast('Cập nhật công việc thành công!', 'success');
        await fetchTodos(search, statusFilter, page, rowsPerPage);
      }
      setDialogOpen(false);
    } catch (error) {
      showToast(dialogMode === 'add' ? 'Lỗi khi thêm công việc' : 'Lỗi khi cập nhật công việc', 'error');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleToggleTodo = async (id, currentStatus) => {
    setIsActionLoading(true);
    try {
      await todoApi.update(id, { is_completed: !currentStatus });
      showToast(!currentStatus ? 'Đã hoàn thành công việc!' : 'Đã mở lại công việc!', 'success');
      
      if ((statusFilter === 'active' || statusFilter === 'completed') && todos.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        await fetchTodos(search, statusFilter, page, rowsPerPage);
      }
    } catch (error) {
      showToast('Lỗi khi cập nhật trạng thái', 'error');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    setIsActionLoading(true);
    try {
      await todoApi.delete(id);
      showToast('Đã xóa công việc thành công!', 'success');
      
      if (todos.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        await fetchTodos(search, statusFilter, page, rowsPerPage);
      }
    } catch (error) {
      showToast('Lỗi khi xóa công việc', 'error');
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ py: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column', px: { xs: 2, sm: 4, md: 6 } }}>
      
      {/* Header Section */}
      <Header 
        onAddClick={handleOpenAddDialog}
        themeMode={themeMode}
        onThemeToggle={onThemeToggle}
        isFetching={isFetching}
      />

      {/* Task Table and Filters Card */}
      <Box sx={{ flexGrow: 1 }}>
        <Paper 
          sx={{ 
            borderRadius: 3, 
            border: '1px solid', 
            borderColor: 'divider',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 500
          }}
        >
          {/* Table Toolbar */}
          <TodoToolbar 
            search={search}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            isActionLoading={isActionLoading}
          />

          {/* Action Loader Progress */}
          {isActionLoading && <LinearProgress color="primary" sx={{ height: 2 }} />}
          {!isActionLoading && <Box sx={{ height: 2 }} />}

          {/* Table */}
          <TodoTable 
            todos={todos}
            totalTodos={totalTodos}
            isFetching={isFetching}
            isActionLoading={isActionLoading}
            search={search}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
            onToggle={handleToggleTodo}
            onEdit={handleOpenEditDialog}
            onDelete={handleDeleteTodo}
          />
        </Paper>
      </Box>

      {/* Global Modal Dialog for Add/Edit */}
      <TodoDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleDialogSubmit}
        initialValue={editingTodo ? editingTodo.title : ''}
        titleText={dialogMode === 'add' ? 'Thêm công việc mới' : 'Chỉnh sửa tên công việc'}
        submitText={dialogMode === 'add' ? 'Thêm' : 'Cập nhật'}
        loading={isActionLoading}
      />

      {/* Toast Notifications */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseToast} 
          severity={toast.severity} 
          variant="filled" 
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default TodoBoard;
