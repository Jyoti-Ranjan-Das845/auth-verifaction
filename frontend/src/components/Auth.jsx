import { useState, useEffect } from 'react';
import '../public/css/Signup.css';
import EmailSignUp from './EmailSignUp';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '@mui/material';
import setSignUpAuth from '../public/js/setSignUp.js';

function Auth(){
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [visib, setVisib] = useState(false);
    const [code, setCode] = useState('');
    const [msg, setMsg] = useState('');
    // const [clicked, setClicked] = React.useState(true);
    const [switchAuth, setSwitch] = useState('signup');
    const [btnColor, setBtnColor] = useState(false);
  
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordClicked, setIsPasswordClicked] = useState(false);

    // useEffect(() => {
    //     // Perform additional work whenever `yourState` is updated
    //     if (code != '' & msg != '') {
    //         // Do your additional work here
    //         console.log('Your state is updated:', code , msg);
    //         setName('');
    //     }
    // }, [code, msg]);


    const handleClick = async() => {
        setBtnColor(!btnColor);
        // setClicked((prev) => prev);
    
    
        if ((!nameError || switchAuth === 'signin') && !emailError && isValidPassword(pass) && email && pass) {
             
            // axios.post('http://localhost:8080/verify/check/do',{email : email, pass : pass})
            // .then()
            // .catch((e) => {
            //     console.log(e);
            // })
            // setAuth(name, email, pass);
            // console.log(name," ",email," ",pass) name asuchi

            if(username){
                await setSignUpAuth(username, email, pass)
                .then((data) => {
                    setCode(data.code);
                    setMsg(data.msg);

                    setName('');
                    setEmail('');
                     setPass('');
                })
            }

        } else {
            // If any field is empty, show the helper text for the empty field
            if (!email) {
                setEmailError(true);
            }
            if (!pass) {
                setIsPasswordClicked(true);
            }
            if (switchAuth === 'signup' && !username) {
                setNameError(true);
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
    
        // if(Name){
        //     Name(event.target.value);
        // }
      };
    
      const handleEmail = (event) => {
        setEmail(event.target.value);
    
        const isValid = isValidEmail(event.target.value);
        setEmailError(!isValid);
    
        // if(Email){
        //     Email(event.target.value);
        // }
      };
    
      const handlePass = (event) => {
        setPass(event.target.value);
    
        // if(Pass){
        //     Pass(event.target.value);
        // }
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


    // const enterName = (text) => {
    //     setName(text);
    // }
    
    // const enterEmail = (text) => {
    //     setEmail(text);
    // }

    // const enterPass = (text) => {
    //     setPass(text);
    // }

    const handleSwitch = (event) => {
        // console.log('btn');

        setName('');
        setEmail('');
        setPass('');

        if(event){
            setSwitch((prev) => {
                if(prev === 'signin'){
                    return 'signup'
                }else{
                    return  'signin'
                }
            });
        }
    }

//  const enterBtn = (val) => {
//         if(val) console.log(name, ' ',email, ' ', pass);
//     }   

    return(
        <>
    <div className="main-back-auth">
      <div className="field-holder">
        <div className="auth-main">
            <p className="h2" style={{fontWeight : '600', fontFamily : 'poppins', fontSize : '2.4rem', marginBottom : '.1rem', textAlign :'center', color : 'white'}}>{switchAuth == 'signup' ? 'Sign Up' : 'Sign In'}</p>
            {/* <hr style={{width : 'auto', backgroundColor : 'rgba(0, 0, 0, 0.35)',marginBottom : '1.6rem'}}/> */}
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
          {
            switchAuth == 'signup' ? <TextField
            id="standard-basic0"
            label="Name"
            variant="standard"
            onChange={handleName}
            onFocus={handleNameFocus}
            onBlur={handleNameBlur}
            value={username}
            required
            error={username === ''}
            helperText={username === '' ? 'Name is required' : ''}
            InputLabelProps={{
              style: { color: nameError && username === '' ? 'white' : 'white' }, // change label color based on error state
            }}
            InputProps={{
              style: { color: 'white' }, // change input text color to white
              className: nameError && username === '' ? 'Mui-error' : '', // add error class to input when error occurs
            }}
            FormHelperTextProps={{
              style: { color: 'white', display : nameError ? 'block' : 'none' }, // change helper text color to green
            }}
          /> : ''
          }
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

            <p style={{textAlign : 'center', fontSize : '.8rem', color  :'white'}}>{switchAuth == 'signup' ? 'Already have an account?' : 'Create new account?'} <a href="#" onClick={handleSwitch}>{switchAuth == 'signup' ? 'SignIn' : 'SignUp'}</a></p>
            {
                code && msg ? 
                   code == 200 ? 
                    (
                        <Stack sx={{ width: '100%', backgroundColor: 'transparent' }} spacing={2}>
                            <Alert variant="filled" severity="success">{msg}</Alert>
                            {/* <Alert severity="info">This is an info Alert.</Alert>
                            <Alert severity="warning">This is a warning Alert.</Alert>
                            <Alert severity="error">This is an error Alert.</Alert> */}
                        </Stack>
                    ) 
                  : code == 500 ? 
                    (
                        <Stack sx={{ width: '100%', backgroundColor: 'red' }} spacing={2}>
                            {/* <Alert severity="success">This is a success Alert.</Alert>
                            <Alert severity="info">This is an info Alert.</Alert>
                            <Alert severity="warning">This is a warning Alert.</Alert> */}
                            <Alert variant="filled" severity="error">{msg}</Alert>
                        </Stack>
                    ) : ''
                :
                ''

            }
        </div>
          </div>
            </div>
        </>
    );
}

export default Auth;