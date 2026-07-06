import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  TablePagination, Box, Skeleton, Typography, useTheme, useMediaQuery
} from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import TodoItem from './TodoItem';
import TodoMobileItem from './TodoMobileItem';

const TodoTable = ({
  todos = [],
  totalTodos = 0,
  isFetching,
  isActionLoading,
  search,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onToggle,
  onEdit,
  onDelete
}) => {
  const displayedTodos = todos;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <>
        <Box sx={{ p: 2, flexGrow: 1, overflow: 'auto' }}>
          {isFetching && todos.length === 0 ? (
            // Mobile Skeleton Loader
            Array.from(new Array(3)).map((_, index) => (
              <Box 
                key={index} 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderRadius: 2.5, 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1.5 
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="circular" width={20} height={20} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton variant="rounded" width={65} height={20} />
                  <Skeleton variant="text" width="35%" height={20} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Skeleton variant="circular" width={28} height={28} />
                  <Skeleton variant="circular" width={28} height={28} />
                </Box>
              </Box>
            ))
          ) : displayedTodos.length > 0 ? (
            // Mobile Todo Items List
            displayedTodos.map((todo) => (
              <TodoMobileItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
                disabled={isActionLoading}
              />
            ))
          ) : (
            // Mobile Empty State
            <Box sx={{ py: 8, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
              <AssignmentLateIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5 }} />
              <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                Không tìm thấy công việc
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 260 }}>
                {search
                  ? 'Không có công việc nào khớp với từ khóa tìm kiếm của bạn.'
                  : 'Danh sách trống. Hãy thêm một công việc để bắt đầu nhé!'}
              </Typography>
            </Box>
          )}
        </Box>
        {/* Table Pagination for Mobile */}
        {totalTodos > 0 && (
          <TablePagination
            component="div"
            count={totalTodos}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Hàng:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to}/${count}`}
            sx={{ borderTop: '1px solid', borderColor: 'divider' }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3.5 }}>Công việc</TableCell>
              <TableCell padding="checkbox" align="center" style={{ width: 120 }}>Hoàn thành</TableCell>
              <TableCell align="center" style={{ width: 120 }}>Trạng thái</TableCell>
              <TableCell align="center" style={{ width: 185 }}>Ngày tạo</TableCell>
              <TableCell align="right" style={{ width: 120, paddingRight: 24 }}>Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isFetching && todos.length === 0 ? (
              // Skeleton Loader
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ pl: 3.5 }}>
                    <Skeleton variant="text" width="85%" height={24} />
                  </TableCell>
                  <TableCell padding="checkbox" align="center">
                    <Skeleton variant="circular" width={20} height={20} sx={{ margin: 'auto' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="rounded" width={75} height={24} sx={{ margin: 'auto' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width="65%" height={24} sx={{ margin: 'auto' }} />
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Skeleton variant="circular" width={28} height={28} />
                      <Skeleton variant="circular" width={28} height={28} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : displayedTodos.length > 0 ? (
              // Todo Items List
              displayedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  disabled={isActionLoading}
                />
              ))
            ) : (
              // Empty State
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 10, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                    <AssignmentLateIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }} />
                    <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                      Không tìm thấy công việc
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                      {search
                        ? 'Không có công việc nào khớp với từ khóa tìm kiếm của bạn.'
                        : 'Danh sách trống. Hãy thêm một công việc để bắt đầu quản lý nhé!'}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Table Pagination */}
      {totalTodos > 0 && (
        <TablePagination
          component="div"
          count={totalTodos}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong ${count}`}
          sx={{ borderTop: '1px solid', borderColor: 'divider' }}
        />
      )}
    </>
  );
};

export default TodoTable;
