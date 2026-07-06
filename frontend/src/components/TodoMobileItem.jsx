import { Card, CardContent, Box, Checkbox, Typography, Chip, Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoMobileItem = ({ todo, onToggle, onEdit, onDelete, disabled }) => {
  return (
    <Card 
      variant="outlined"
      sx={{
        mb: 2,
        borderRadius: 2.5,
        borderColor: 'divider',
        opacity: todo.is_completed ? 0.75 : 1,
        backgroundColor: (theme) => todo.is_completed ? theme.palette.custom.completedBg : 'background.paper',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: 'primary.light',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
        }
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
          <Checkbox
            checked={todo.is_completed}
            onChange={() => onToggle(todo.id, todo.is_completed)}
            disabled={disabled}
            color="secondary"
            sx={{ p: 0, mt: 0.5 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: todo.is_completed ? 'line-through' : 'none', 
                color: todo.is_completed ? 'text.secondary' : 'text.primary',
                wordBreak: 'break-word',
                mb: 1
              }}
            >
              {todo.title}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
              {todo.is_completed ? (
                <Chip 
                  label="Đã xong" 
                  color="secondary" 
                  size="small" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '0.7rem',
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
                    fontSize: '0.7rem'
                  }} 
                />
              )}
              
              <Typography variant="caption" color="text.secondary">
                {todo.created_at 
                  ? new Date(todo.created_at).toLocaleString('vi-VN', { 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric' 
                    })
                  : '---'}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Action buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1.5, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Tooltip title="Chỉnh sửa công việc">
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
          </Tooltip>
          <Tooltip title="Xóa công việc">
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
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoMobileItem;
