import { useEffect, useState } from 'react';
import '../public/css/Weather.css'
import Input from './Input.jsx';
import getWeather from '../public/js/getWeather.js'
import currWeather from '../public/js/currWeather.js';
import getTime from '../public/js/getTime.js';
import SunTime from './SunTime.jsx';
import Additionals from './Additionals.jsx';
import setLogOut from '../public/js/setLogOut';
import { useNavigate } from 'react-router-dom';
// import { googleLogout } from '@react-oauth/google';
// import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
// import { gapi } from 'gapi-script';

function Weather(){
//    const history = useHistory();
const navigate = useNavigate();
    const [backgroundImage, setBackgroundImage] = useState('');
    const [currName, setCurrName] = useState('');
    const [userText, setUserText] = useState('');
    const [mainTemp, setMainTemp] = useState({
        temp : '--',
        // back : '',
        icon : '',
        name : '---',
        time : '--',
        high : '--',
        low : '--'
    });
    const [suntime, setSuntime] = useState({
        cn : '',
        sunrise : '',
        suntime : ''
    });

    const [additional, setAdditional] = useState({
        feels_like : '',
        humidity : '',
        visibility : '',
        wind_speed : '',
        grnd_lvl : '',
        sea_lvl : '',
        pressure : ''
    });
    
    useEffect(() => {
        setBackgroundImage('/assets/back-img/main-back.avif');
         
        // let currUW;

    const getLocationAndWeather = async () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (success) => {
                    try {
                        const res = await currWeather(success.coords.latitude, success.coords.longitude);
                        // userWeather = res;
                        // console.log('user', userWeather);
                        resolve(res);
                    } catch (err) {
                        console.log(err);
                        reject(err);
                    }
                });
            }
        });
    };

    // Usage
    getLocationAndWeather()
        .then((userWeather) => {
            // Continue using userWeather outside the if block
            console.log(userWeather)
            setMainTemp((prev) => {
                
                const formattedTime = getTime();

                return {...prev, temp : Math.floor(userWeather.main.temp), icon : userWeather.weather[0].icon, name : userWeather.name, time : formattedTime, high : userWeather.main.temp_max, low : userWeather.main.temp_min}
            })

            setCurrName(userWeather.name);

            setSuntime((prev) => {
                return{...prev, cn : userWeather.sys.country, sunrise : getTime(userWeather.sys.sunrise), sunset : getTime(userWeather.sys.sunset)};
            });

            setAdditional((prev) => {
                return{...prev, feels_like : userWeather.main.feels_like, humidity : userWeather.main.humidity, visibility : userWeather.visibility, wind_speed : userWeather.wind.speed, grnd_lvl : userWeather.main.grnd_level, sea_lvl : userWeather.main.sea_lvl, pressure : userWeather.main.pressure};
            });

            
        })
        .catch((err) => {
            // Handle errors
            console.log(err);
        });
        

        // console.log(currUW)

    }, []);

    const selectIcon = (id) => {
        if(id === '01d' || id === '01n'){
            return 'clearSky';
        }else if(id === '02d' || id === '02n'){
            return 'fewClouds';
        }else if(id === '03d' || id === '03n'){
            return 'cloud';
        }else if(id === '04d' || id === '04n'){
            return 'brokenCloud';
        }else if(id === '09d' || id === '09n'){
            return 'showerRain';
        }else if(id === '10d' || id === '10n'){
            return 'Rain';
        }else if(id === '11d' || id === '11n'){
            return 'thunderstrom';
        }else if(id === '13d' || id === '13n'){
            return 'snow';
        }else if(id === '50d' || id === '50n'){
            return 'mist';
        }
    }

    const selectBackImg = (id) => {
        if(id === '01d' || id === '01n'){
            return 'clearSky';
        }else if(id === '02d' || id === '02n'){
            return 'fewClouds';
        }else if(id === '03d' || id === '03n'){
            return 'scatterClouds';
        }else if(id === '04d' || id === '04n'){
            return 'brokenClouds';
        }else if(id === '09d' || id === '09n'){
            return 'rainShowers';
        }else if(id === '10d' || id === '10n'){
            return 'rain';
        }else if(id === '11d' || id === '11n'){
            return 'thunderstrom';
        }else if(id === '13d' || id === '13n'){
            return 'snow';
        }else if(id === '50d' || id === '50n'){
            return 'mist';
        }
    }

    const enteredText = (text) => {
        setUserText(text);
    }

    const getClick = (val) => {
        // let finalCondition;
        if(val){
            // console.log(userText);
            getWeather(userText)
            .then((userWeather) => {
                // console.log('res',res);
                // finalCondition = res;

                setMainTemp((prev) => {
                
                    const formattedTime = getTime();
                    return {...prev, temp : Math.floor(userWeather.main.temp), icon : userWeather.weather[0].icon, name : userWeather.name, time : formattedTime, high : userWeather.main.temp_max, low : userWeather.main.temp_min}
                })

                setCurrName(userText.charAt(0).toUpperCase() + userText.slice(1));

                setSuntime((prev) => {
                    return{...prev, cn : userWeather.sys.country, sunrise : getTime(userWeather.sys.sunrise), sunset : getTime(userWeather.sys.sunset)};
                });

                setAdditional((prev) => {
                    return{...prev, feels_like : userWeather.main.feels_like, humidity : userWeather.main.humidity, visibility : userWeather.visibility, wind_speed : userWeather.wind.speed, grnd_lvl : userWeather.main.grnd_level, sea_lvl : userWeather.main.sea_lvl, pressure : userWeather.main.pressure};
                });
            })
            .catch((err) => {
                console.log(err);
            })
            
    
            
        }

        setUserText('');
        // console.log('btn:',finalCondition);
    }

//     const login=useGoogleLogin({
//         onSuccess:async(response)=>{
//             try{
    
//              const res = await axios.get(
//                " https://www.googleapis.com/oauth2/v3/userinfo",
               
//                {
//                 headers:{
                    
//                     Authorization: `Bearer ${response.access_token}`,
//                 },
//                }
//              );
//             //  setIsLog(true);
//             //  setEmail(res.data.email);
//             //  setName(res.data.given_name);
//             return res.data.sub;
    
//              console.log(res.data);
//             }catch(e){
//                 console.log(e)
//             }
//         }
//     })

//  // Load the Google API library asynchronously
//  function loadGoogleAPI() {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/api.js';
  
//       script.onload = resolve;
//       script.onerror = reject;
  
//       document.body.appendChild(script);
//     });
//   }
  

// // Initialize the Google API
// async function initializeGoogleAPI() {
//     await loadGoogleAPI()
//     .then(() => {
//         if (window.gapi && window.gapi.auth2) {
//             return window.gapi.auth2.getAuthInstance();
//           } else {
//             throw new Error('Google API initialization failed.');
//           }
//     })
//     // Check if gapi object is available before accessing it
    
//   }
  

// // Call this function before accessing the Google API
// async function checkGoogleLoggedIn() {
//     try {
//       await initializeGoogleAPI()
//       .then((u) => {
//         const isGoogleLoggedIn = u.isSignedIn.get();
//       console.log(isGoogleLoggedIn);
//       })
      
//     } catch (error) {
//       console.error('Error initializing Google API:', error);
//     }
//   }
  

// // Call the function to check if the user is logged in with Google
// // checkGoogleLoggedIn();

// async function handleOut() {
//     const isLoggedIn = await checkGoogleLoggedIn();
//     if (isLoggedIn) {
//       googleLogout();
//     }
//   }
  


    const handleOut = async () => {


        
        // const data = login();

        // if(data){
        //     googleLogout();
        // }else{

        // const isGoogleLoggedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();

        // if(isGoogleLoggedIn){
        //     googleLogout();
        // }else{

            await setLogOut()
            .then((res)=>{
               if(res.code == 200){navigate('/')};
            }) 
            .catch((e)=>{
             console.log(e);
            }) 
        // }
        checkGoogleLoggedIn();
        // googleLogout();
            
        // }
    }

    return(
        <>
           <div 
             className="page-hold"
             style={{backgroundImage : `url(${selectBackImg(mainTemp.icon) ? '/assets/back-img/' + selectBackImg(mainTemp.icon) + '.avif' : backgroundImage})`, backgroundRepeat : 'no-repeat', backgroundSize : 'cover'}}
           >
             
             <div className="outlined-ele" style={{marginLeft : '6.57rem'}} >
                 <Input InputText={enteredText} BtnClick={getClick} />
                 <div className="log-cont" onClick={handleOut}>
                     <i className="fa-solid fa-right-from-bracket" style={{fontSize : '1.2rem', color : 'white'}}></i>
                 </div>
             </div>

             <div className="bottom">
                <div className="bt-left">
                    <div className="bt-l-content">

                        <div className="l-one">
                           <div className="l-o-one">
                             <span style={{fontSize: '6rem', fontWeight : '600', color: 'white', padding: 0}}>{mainTemp.temp != '--' ? mainTemp.temp : '--'}</span>
                             <div className="deg">
                               <sup style={{fontWeight: '500', fontSize: '1.8rem', color: 'white'}}>&deg;C</sup>
                             </div>
                           </div>

                           <div className="l-o-two" style={{marginTop: '.4rem'}}>
                                
                              {
                                selectIcon(mainTemp.icon) && <img src={`/assets/icons/tempCondition/${selectIcon(mainTemp.icon)}.png`} alt="icon"  height={'70rem'} width={'70rem'}/>
                              }
                                
                           </div>
                        </div>

                        <div className="l-two">
                            <span style={{fontWeight: '600', color: 'white', fontSize: '2.2rem', marginLeft: '.9rem'}}>{currName != '' ? currName : ''}</span>
                        </div>

                        <div className="l-three">
                            <span style={{fontWeight: '400', fontSize: '1rem', color: 'white', marginLeft: '.9rem', letterSpacing: '.1rem'}}>
                            {mainTemp.time != '--' ? mainTemp.time : '--'} | H:{mainTemp.high != '--' ? mainTemp.high : '--'} <sup>&deg;</sup> L:{mainTemp.low != '--' ? mainTemp.low : '--'} <sup>&deg;</sup>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="bt-right">
                     <div className="bt-r-t">
                          <SunTime sunInfo={suntime}/>
                          
                     </div>

                     <div className="bt-r-b">
                            <Additionals info={additional}/>
                     </div>
                </div>
             </div>

           </div>
        </>
    );
}

export default Weather;