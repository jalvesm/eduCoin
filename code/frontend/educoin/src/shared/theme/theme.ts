import { createTheme } from '@mui/material/styles';
import colors from './colors';
import typography from './typography';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
    },
    text: {
      /* primary: colors.textPrimary, */
      secondary: colors.textSecondary,
    },
    error: {
      main: colors.error,
    },
    warning: {
      /* main: colors.warning, */
    },
    info: {
      /* main: colors.info, */
    },
    success: {
      /* main: colors.success, */
    },
  },
  typography: typography,
});

export default theme;