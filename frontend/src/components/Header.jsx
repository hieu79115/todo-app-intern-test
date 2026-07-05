import { Box, Typography, Button, Tooltip, IconButton } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AddIcon from '@mui/icons-material/Add';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Header = ({ onAddClick, themeMode, onThemeToggle, isFetching }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        pb: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <PlaylistAddCheckIcon color="primary" sx={{ fontSize: 36 }} />
        <Typography variant="h5" fontWeight="bold" letterSpacing="-0.5px">
          Todo List
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          disabled={isFetching}
          sx={{ 
            px: 2.5,
            py: 0.8,
            fontSize: '0.9rem',
            boxShadow: (theme) => theme.palette.mode === 'light' 
              ? '0 4px 6px -1px rgba(99, 102, 241, 0.2), 0 2px 4px -2px rgba(99, 102, 241, 0.2)' 
              : 'none',
          }}
        >
          Thêm công việc
        </Button>
        
        <Tooltip title={themeMode === 'light' ? 'Chuyển sang Giao diện tối' : 'Chuyển sang Giao diện sáng'}>
          <IconButton 
            onClick={onThemeToggle} 
            color="inherit" 
            sx={{ 
              border: '1px solid', 
              borderColor: 'divider',
              height: 38,
              width: 38
            }}
          >
            {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
