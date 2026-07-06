import { Box, TextField, InputAdornment, IconButton, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const TodoToolbar = ({ 
  search, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange, 
  isActionLoading 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ p: 2.5, pb: 1.5 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2, 
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Search Bar */}
        <TextField
          fullWidth
          size="small"
          placeholder="Tìm kiếm công việc..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={isActionLoading}
          sx={{ maxWidth: { xs: '100%', sm: 300 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => onSearchChange('')} disabled={isActionLoading}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />

        {/* Status Filters */}
        <Tabs
          value={statusFilter}
          onChange={(e, newValue) => onStatusFilterChange(newValue)}
          textColor="primary"
          indicatorColor="primary"
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{
            minHeight: 36,
            height: 36,
            backgroundColor: (theme) => theme.palette.background.neutral,
            borderRadius: 2,
            p: 0.5,
            alignSelf: { xs: 'stretch', sm: 'auto' },
            '& .MuiTabs-indicator': {
              height: '100%',
              borderRadius: 1.5,
              zIndex: 0,
              backgroundColor: (theme) => theme.palette.custom.tabsIndicatorBg,
              boxShadow: (theme) => theme.palette.custom.tabsIndicatorShadow
            },
            '& .MuiTab-root': {
              minHeight: 28,
              height: 28,
              fontSize: '0.85rem',
              fontWeight: 600,
              zIndex: 1,
              textTransform: 'none',
              color: 'text.secondary',
              px: 2,
              whiteSpace: 'nowrap',
              '&.Mui-selected': {
                color: 'primary.main',
              }
            }
          }}
        >
          <Tab label="Tất cả" value="all" />
          <Tab label="Đang làm" value="active" />
          <Tab label="Đã xong" value="completed" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default TodoToolbar;
