// @mui
import { listClasses } from '@mui/material/List';

// ----------------------------------------------------------------------

export const createComponents = (palette) => {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        paper: {
          // ...paper({ theme, dropdown: true }),
          [`& .${listClasses.root}`]: {
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: palette.divider,
          opacity: 1
        }
      }
    },




  };
};
