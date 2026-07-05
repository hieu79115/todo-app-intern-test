import { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, CircularProgress, Box, IconButton, Typography 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TodoDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  initialValue = '', 
  titleText = 'Thêm công việc mới', 
  submitText = 'Lưu', 
  loading = false 
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setValue(initialValue);
      setError('');
    }
  }, [open, initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = value.trim();
    
    if (!trimmedValue) {
      setError('Tên công việc không được để trống');
      return;
    }

    if (trimmedValue.length > 255) {
      setError('Tên công việc không được vượt quá 255 ký tự');
      return;
    }

    onSubmit(trimmedValue);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) setError('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          {titleText}
        </Typography>
        {!loading && (
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent sx={{ px: 2, py: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Tên công việc"
            type="text"
            fullWidth
            variant="outlined"
            value={value}
            onChange={handleChange}
            error={!!error}
            helperText={error || `${value.length}/255`}
            disabled={loading}
            slotProps={{
              htmlInput: { maxLength: 255 }
            }}
          />
        </DialogContent>
        
        <DialogActions sx={{ px: 2, py: 2 }}>
          <Button 
            onClick={onClose} 
            color="inherit" 
            disabled={loading}
            sx={{ px: 2 }}
          >
            Hủy
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={loading || !value.trim()}
            sx={{ 
              px: 3,
              position: 'relative',
              minWidth: 100
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'primary.contrastText' }} />
            ) : (
              submitText
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TodoDialog;
