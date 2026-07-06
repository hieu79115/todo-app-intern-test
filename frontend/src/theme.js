import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#6366f1' : '#818cf8', // Indigo
      light: '#a5b4fc',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: mode === 'light' ? '#10b981' : '#34d399', // Emerald
      light: '#6ee7b7',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    error: {
      main: mode === 'light' ? '#f43f5e' : '#fb7185', // Rose
    },
    warning: {
      main: mode === 'light' ? '#f59e0b' : '#fbbf24', // Amber
    },
    info: {
      main: mode === 'light' ? '#0ea5e9' : '#38bdf8', // Sky
    },
    background: {
      default: mode === 'light' ? '#f8fafc' : '#0f172a', // Slate 50 vs Slate 900
      paper: mode === 'light' ? '#ffffff' : '#1e293b',   // White vs Slate 800
      neutral: mode === 'light' ? '#f1f5f9' : '#1e293b', // Grey background for headers, tabs
    },
    text: {
      primary: mode === 'light' ? '#0f172a' : '#f8fafc',
      secondary: mode === 'light' ? '#64748b' : '#94a3b8',
    },
    divider: mode === 'light' ? '#e2e8f0' : '#334155',
    custom: {
      tabsIndicatorBg: mode === 'light' ? '#ffffff' : '#0f172a',
      tabsIndicatorShadow: mode === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
      completedBg: mode === 'light' ? '#f8fafc' : '#111b27',
      completedChipBg: mode === 'light' ? '#e6fcf5' : '#064e3b',
      completedChipText: mode === 'light' ? '#0ca678' : '#34d399',
      actionEditBg: mode === 'light' ? '#f0f3ff' : '#232f57',
      actionEditHoverBg: mode === 'light' ? '#e0e7ff' : '#312e81',
      actionDeleteBg: mode === 'light' ? '#fff0f2' : '#4c1d24',
      actionDeleteHoverBg: mode === 'light' ? '#ffe2e6' : '#881337',
      primaryBtnShadow: mode === 'light' ? '0 4px 6px -1px rgba(99, 102, 241, 0.2), 0 2px 4px -2px rgba(99, 102, 241, 0.2)' : 'none',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    body1: { fontSize: '0.95rem' },
    body2: { fontSize: '0.875rem' },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: mode === 'light' 
            ? '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05), 0 0 0 1px rgb(0 0 0 / 0.02)' 
            : '0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2), 0 0 0 1px rgb(255 255 255 / 0.02)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: ({ theme }) => ({
          fontWeight: 600,
          backgroundColor: theme.palette.background.neutral,
          color: theme.palette.mode === 'light' ? '#475569' : '#94a3b8',
        }),
        root: {
          padding: '16px',
        },
      },
    },
  },
});

export const theme = (mode) => createTheme(getDesignTokens(mode));
export default theme;
