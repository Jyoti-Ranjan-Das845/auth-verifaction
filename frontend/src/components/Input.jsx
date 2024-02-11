import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': 'white',
            '--TextField-brandBorderFocusedColor': '#f7f2dc',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
            '& input': {
              color: '#ffffff', // Text color
            },
            '& label' : {
              color: 'white', // Placeholder color
              fontSize : '.9rem',
              letterSpacing : '.08rem'
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(8, 8, 8, 0.47)',
            '&::before, &::after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
              
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            //   backgroundColor: 'rgba(8, 8, 8, 0.47)'
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });

export default function Input({InputText, BtnClick}) {
  const outerTheme = useTheme();

  const [text, setText] = useState('');
  const [btn, setBtn] = useState(true);

  const handleText = (event) => {
      setText(event.target.value);
    //   console.log(text);

      if(InputText){
          InputText(event.target.value);
      }
  }

  const toogleButton = () => {
     setBtn((prevValue) => prevValue);

     if(BtnClick){
        BtnClick(btn);
        setText('');
     }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems : 'center',
        // justifyContent: 'center',
        gap: 1,
        width: 'auto',
      }}
    >
      <ThemeProvider theme={customTheme(outerTheme)}>
        {/* <TextField label="Outlined" />
        <TextField label="Filled" variant="filled" /> */}
        <TextField label="Enter Location" variant="filled" style={{width : '15rem'}} onChange={handleText} value={text}/>
      </ThemeProvider>
      <IconButton size="large" aria-label="search" color="inherit" style={{marginTop: '.1rem', backgroundColor : 'rgba(8, 8, 8, 0.47)'}} onClick={toogleButton} >
            <SearchIcon style={{ fontSize: '1.6rem', color: '#e0e0e0',}} />
      </IconButton>
    </Box>
  );
}