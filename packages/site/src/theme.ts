import type { Theme } from '@mui/material';

export const getDesignTokens = (
  mode: 'light' | 'dark',
): {
  typography: { body1: { fontSize: string }; body2: { fontSize: string } };
  components: {
    MuiButton: {
      styleOverrides: {
        contained: { boxShadow: string; '&:hover': { boxShadow: string } };
        outlined: ({ theme }: { theme: any }) => {
          '&:hover': { border: string; '& span': { transition: string } };
        };
        root: ({ theme }: { theme: any }) => {
          border: string;
          padding: string;
          overflow: string;
          borderRadius: string;
          fontSize: string;
          position: string;
          transition: string;
          textTransform: string;
        };
        text: { '&:hover': { background: string } };
      };
    };
  };
  palette: {
    mode: 'light' | 'dark';
    background: { default: string; paper: string };
    text: { primary: string };
    primary: { main: string };
  };
} => ({
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
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
          },
        }),
  },
  typography: {
    body1: {
      fontSize: '1.5rem', // Измените на желаемый размер шрифта
    },
    body2: {
      fontSize: '1.85rem', // Измените на желаемый размер шрифта
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
          border: `1px solid ${theme.palette.primary.main}`,
          transition: 'all 0.4s ease-in-out',
        }),
        contained: {
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
          },
        },
        outlined: ({ theme }) => ({
          '&:hover': {
            border: `1px solid ${theme.palette.text.primary}`,
            '& span': {
              transition: 'color 0.4s ease-in-out',
            },
          },
        }),
        text: {
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  },
});
