// import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
// import axios from "axios";
// import { useEffect, useState } from 'react';


// function Glogin({Email, Name, Logged}){
// const [isLog, setIsLog] = useState(false);
// const [email,setEmail] = useState('');
// const [name,setName] = useState('');

// useEffect(() =>{
//     if(Email){
//       Email(email);
//     }
//     if(Name){
//         Name(name);
//     }
//     if(Logged){
//         Logged(isLog);
//     }
// }, [email,name,isLog]);

// const login=useGoogleLogin({
//     onSuccess:async(response)=>{
//         try{

//          const res = await axios.get(
//            " https://www.googleapis.com/oauth2/v3/userinfo",
           
//            {
//             headers:{
                
//                 Authorization: `Bearer ${response.access_token}`,
//             },
//            }
//          );
//          setIsLog(true);
//          setEmail(res.data.email);
//          setName(res.data.given_name);

//          console.log(res.data);
//         }catch(e){
//             console.log(e)
//         }
//     }
// })

// return(
     
//       <>
//       <button onClick={()=>login()} > Sign in with google </button> 
//       </>
   
  
// )
// }
// export default Glogin;
