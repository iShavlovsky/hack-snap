import type { Theme } from '@mui/material';

export const getDesignTokens = (mode: 'light' | 'dark'): Theme => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#ff6b6b',
          },
          background: {
            default: '#ffffff',
            paper: '#f0f0f0',
          },
          text: {
            primary: '#000000',
          },
        }
      : {
          primary: {
            main: '#FF523A',
          },
          background: {
            default: '#121212',
            paper: '#121212',
          },
          text: {
            primary: '#ffffff',
          },
        }),
  },
  typography: {
    body1: {
      fontSize: '18px',
    },
    body2: {
      fontSize: '1.85rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          position: 'relative',
          overflow: 'hidden',
          padding: '10px 20px',
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          borderRadius: '4px',
          transition: 'all 0.4s ease-in-out',
        }),
        contained: ({ theme }) => ({
          border: `1px solid ${theme.palette.primary.main}`,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
          },
        }),
        outlined: ({ theme }) => ({
          border: `1px solid ${theme.palette.primary.main}`,
          '&:hover': {
            border: `1px solid ${theme.palette.text.primary}`,
            '& span': {
              transition: 'color 0.4s ease-in-out',
            },
          },
        }),
        text: {
          background:
            'linear-gradient(282.26deg, #0F9A68 10.03%, #007580 91.07%)',
          color: '#fff',
          '& span': {
            transition: 'color 0.4s ease-in-out',
          },
          '&:hover': {
            background:
              'linear-gradient(282.26deg, #007580 10.03%, #0F9A68 91.07%)',
          },
        },
      },
    },
  },
});
