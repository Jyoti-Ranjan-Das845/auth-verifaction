import'../public/css/Sunrise.css';

function Sunrise({sunrise, country}){

    return(
        <>
         <div className="sunrise">
           <img src="/assets/icons/sunTime/sunrise.png" alt="sunrise" height={'60'} width={'60'} style={{marginTop: '.5rem'}}/>
            <div className="hr" style={{width: '5rem',height: '1rem', marginTop: '.5rem', opacity: '0.7'}}>
            <hr style={{backgroundColor : 'white', marginTop : '-.1rem'}}/>
            </div>
            <span style={{color : 'white', marginTop : '.1rem', fontSize : '.9rem', opacity : '0.7'}}>
                {sunrise} | {country}
            </span>
         </div>
        </>
    );
}

export default Sunrise;