import '../public/css/Pressure.css';

function Pressure({val}){

    return(
        <>
          <div className="pres">
        <img
            src="/assets/icons/additionals/resilience.png"
            alt="humidity"
            height={'30rem'}
            width={'30rem'}
            style={{ marginTop: '.9rem' }}
          />

          <div className="hr" style={{width: '5rem',height: '1rem', marginTop: '.8rem', opacity: '0.7'}}>
            <hr style={{backgroundColor : 'white', marginTop : '-.1rem'}}/>
            <p style={{marginTop: '-.3rem', color: 'white', fontSize:'.8rem', textAlign: 'center'}}>Air Pressure</p>
          </div>

          <span style={{ color: 'white', marginTop: '1.1rem', fontSize: '1.1rem', opacity: '1' }}>
                {val}&nbsp;<small>hPa</small>
          </span>
          
        </div>
        </>
    );
}

export default Pressure;