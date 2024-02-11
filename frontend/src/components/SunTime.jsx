import '../public/css/SunTime.css';
import Sunrise from './Sunrise.jsx';
import Sunset from './Sunset.jsx';

function SunTime({sunInfo}){

    return(
        <>
           <div className="suntime">
               <Sunrise sunrise={sunInfo.sunrise} country={sunInfo.cn} />
               <Sunset sunset={sunInfo.sunset} country={sunInfo.cn} />
            </div> 
        </>
    );
}

export default SunTime;