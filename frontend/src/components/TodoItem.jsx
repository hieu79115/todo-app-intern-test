import { TableRow, TableCell, Checkbox, IconButton, Tooltip, Chip, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({ todo, onToggle, onEdit, onDelete, disabled }) => {
  const formattedDate = todo.created_at 
    ? new Date(todo.created_at).toLocaleString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      })
    : '---';

  return (
    <TableRow
      hover
      sx={{ 
        opacity: todo.is_completed ? 0.7 : 1,
        transition: 'all 0.2s',
        backgroundColor: (theme) => 
          todo.is_completed 
            ? theme.palette.custom.completedBg 
            : 'inherit',
        '&:hover': {
          backgroundColor: (theme) => theme.palette.background.neutral
        }
      }}
    >
      {/* 1. Công việc (Title) */}
      <TableCell sx={{ py: 1.5 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 500,
            textDecoration: todo.is_completed ? 'line-through' : 'none', 
            color: todo.is_completed ? 'text.secondary' : 'text.primary',
            wordBreak: 'break-word'
          }}
        >
          {todo.title}
        </Typography>
      </TableCell>

      {/* 2. Chọn (Checkbox) */}
      <TableCell padding="checkbox" align="center" sx={{ py: 1.5 }}>
        <Checkbox
          checked={todo.is_completed}
          onChange={() => onToggle(todo.id, todo.is_completed)}
          disabled={disabled}
          color="secondary"
        />
      </TableCell>
      
      {/* 3. Trạng thái (Status Badge) */}
      <TableCell align="center" sx={{ py: 1.5 }}>
        {todo.is_completed ? (
          <Chip 
            label="Đã xong" 
            color="secondary" 
            size="small" 
            sx={{ 
              fontWeight: 600,
              fontSize: '0.75rem',
              backgroundColor: (theme) => theme.palette.custom.completedChipBg,
              color: (theme) => theme.palette.custom.completedChipText
            }} 
          />
        ) : (
          <Chip 
            label="Đang làm" 
            color="warning" 
            size="small" 
            variant="outlined"
            sx={{ 
              fontWeight: 600,
              fontSize: '0.75rem'
            }} 
          />
        )}
      </TableCell>
      
      {/* 4. Ngày tạo (Created Date) */}
      <TableCell align="center" sx={{ py: 1.5 }}>
        <Typography variant="body2" color="text.secondary">
          {formattedDate}
        </Typography>
      </TableCell>
      
      {/* 5. Thao tác (Action Buttons) */}
      <TableCell align="right" sx={{ py: 1.5, pr: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
          <Tooltip title="Chỉnh sửa công việc">
            <span>
              <IconButton 
                size="small" 
                color="primary" 
                onClick={() => onEdit(todo)}
                disabled={disabled}
                sx={{
                  backgroundColor: (theme) => theme.palette.custom.actionEditBg,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.custom.actionEditHoverBg
                  }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          
          <Tooltip title="Xóa công việc">
            <span>
              <IconButton 
                size="small" 
                color="error" 
                onClick={() => onDelete(todo.id)} 
                disabled={disabled}
                sx={{
                  backgroundColor: (theme) => theme.palette.custom.actionDeleteBg,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.custom.actionDeleteHoverBg
                  }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TodoItem;