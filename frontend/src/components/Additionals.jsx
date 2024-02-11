import '../public/css/Additionals.css';
import Sunset from './Sunset';
import FeelsLike from './FeelsLike.jsx';
import Humidity from './Humidity.jsx';
import Visibility from './Visibility.jsx';
import Wind from './Wind.jsx';
import Elevation from './Elevation.jsx';
import Pressure from './Pressure.jsx';

function Additionals({info}){

    return(
        <>
          <div className="addition">
                <FeelsLike val={info.feels_like}/>
                <Humidity val={info.humidity} />
                <Visibility val={info.visibility}/>
                <Wind val={info.wind_speed}/>
                {
                    info.grnd_level && info.sea_lvl ? (
                        <Elevation val1={info.grnd_lvl} val2={info.sea_lvl} />
                      ) : null
                }

                {
                    info.pressure && <Pressure val={info.pressure}/>
                }
                
          </div>
        </>
    );
}

export default Additionals;