import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

function Glogin(){
const login=useGoogleLogin({
    onSuccess:async(response)=>{
        try{

         const res = await axios.get(
           " https://www.googleapis.com/oauth2/v3/userinfo",
           
           {
            headers:{
                
                Authorization: `Bearer ${response.access_token}`,
            },
           }
         );
         console.log(res.data);
        }catch(e){
            console.log(e)
        }
    }
})

return(
     
      <>
      <button onClick={()=>login()} > Sign in with google </button> 
      </>
   
  
)
}
export default Glogin;
