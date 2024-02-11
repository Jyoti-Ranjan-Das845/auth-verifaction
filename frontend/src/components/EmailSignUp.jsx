import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '@mui/material';

export default function EmailSignUp({Name, Email, Pass, Btn}) {
  const [name, setName] =React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [visib, setVisib] = React.useState(false);
  const [clicked, setClicked] = React.useState(true);
  const [btnColor, setBtnColor] = React.useState(false);

  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = React.useState(false);



  const handleClick = () => {
    setBtnColor(!btnColor);
    setClicked((prev) => prev);


    if(!nameError && !emailError && isValidPassword(pass)){
      if(Btn){
        Btn(clicked);
        setName('');
        setEmail('');
        setPass('');
      }
    }
  };

  const handleVisib = (event) => {
    // event.stopPropagation();
     if(event){
        setVisib(!visib);
     }
  }

  const handleName = (event) => {
    setName(event.target.value);

    if(Name){
        Name(event.target.value);
    }
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);

    const isValid = isValidEmail(event.target.value);
    setEmailError(!isValid);

    if(Email){
        Email(event.target.value);
    }
  };

  const handlePass = (event) => {
    setPass(event.target.value);

    if(Pass){
        Pass(event.target.value);
    }
  };


  const handleNameFocus = () => {
    setNameError(true);
  };
  
  const handleNameBlur = () => {
    setNameError(false);
  };

  const isValidEmail = (email) =>  {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) =>  {
    return password.length >= 8; 
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };
  
  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };
  
  const handlePasswordClick = () => {
    setIsPasswordClicked(true);
  };
  

  return (
    <>
    <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > :not(style)': {
            m: 1,
            marginBottom: 2.1,
            color: 'white', // Text color
          },
          '& > :not(style) input': {
            color: 'white', // Text color for input
          },
          '& > :not(style) .MuiInput-underline:before': {
            borderBottomColor: 'white', // Bottom line color when not focused
          },
          '& > :not(style) .MuiInput-underline:after': {
            borderBottomColor: 'white', // Bottom line color when focused
          },
          '& .MuiInputLabel-root': {
            color: 'white', // Label color
          },
          '& .Mui-focused .MuiInputLabel-root': {
            color: 'white', // Label color when focused
          },
          '& .Mui-focused': {
            color: 'white !important', // Text color when focused
          },
        }}
        noValidate
        auto="true"
        >
          <TextField
          id="standard-basic0"
          label="Name"
          variant="standard"
          onChange={handleName}
          onFocus={handleNameFocus}
          onBlur={handleNameBlur}
          value={name}
          required
          error={name === ''}
          helperText={name === '' ? 'Name is required' : ''}
          InputLabelProps={{
            style: { color: nameError && name === '' ? 'white' : 'white' }, // change label color based on error state
          }}
          InputProps={{
            style: { color: 'white' }, // change input text color to white
            className: nameError && name === '' ? 'Mui-error' : '', // add error class to input when error occurs
          }}
          FormHelperTextProps={{
            style: { color: 'white', display : nameError ? 'block' : 'none' }, // change helper text color to green
          }}
        />
        <TextField
          id="standard-basic1"
          label="Email Address"
          variant="standard"
          onChange={handleEmail}
          value={email}
          required
          error={!isValidEmail(email) && emailError} // Check for email validity and error state
          helperText={!isValidEmail(email) && emailError ? 'Invalid email address' : ''}
        />
        <TextField
  id="standard-basic2"
  label="Password"
  variant="standard"
  type={visib ? 'text' : 'password'}
  onChange={handlePass}
  value={pass}
  required
  error={!isValidPassword(pass)}
  helperText={(isPasswordClicked && !isValidPassword(pass)) ? 'Password must be at least 8 characters long' : ''}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end" onClick={handleVisib}>
        {visib ? (
          <Icon className="fas fa-eye" style={{ cursor: 'pointer', fontSize: '1rem', color: 'white' }} />
        ) : (
          <i className="fa-solid fa-eye-slash" style={{ color: 'white' }}></i>
        )}
      </InputAdornment>
    ),
    style: { color: isPasswordFocused || isPasswordClicked ? 'white' : 'white' }, // Text color
    focused: { color: 'white' }
  }}
  InputLabelProps={{
    style: { color: isPasswordFocused || isPasswordClicked ? 'white' : 'white' }, // Label color
  }}
  FormHelperTextProps={{
    style: { color: 'white' }, // Helper text color
  }}
  onFocus={handlePasswordFocus}
  onBlur={handlePasswordBlur}
  onClick={handlePasswordClick}
/>

      </Box>

      <Stack spacing={2} direction="row" sx={{ marginLeft: 1, marginTop: 1 }}>
        <Button
          variant="outlined"
          onClick={handleClick}
          sx={{
            color: btnColor ? '#AAFF00' : 'white',
            border: `1px solid ${btnColor ? '#AAFF00' : 'white'}`,
            transition: 'color 0.3s, border 0.3s',
            '&:hover': {
              color: '#AAFF00',
              border: '1px solid #AAFF00',
            },
            '&:active': {
              color: '#AAFF00',
              border: '1px solid #AAFF00',
            },
          }}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
}
