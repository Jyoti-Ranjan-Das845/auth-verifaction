import '../public/css/FeelsLike.css'

function FeelsLike({val}){

    return(
        <>
        <div className="feels">
        <img
            src="/assets/icons/additionals/thermometer.png"
            alt="feels-like"
            height={'30rem'}
            width={'30rem'}
            style={{ marginTop: '.9rem' }}
          />

          <div className="hr" style={{width: '5rem',height: '1rem', marginTop: '.8rem', opacity: '0.7'}}>
            <hr style={{backgroundColor : 'white', marginTop : '-.1rem'}}/>
            <p style={{marginTop: '-.3rem', color: 'white', fontSize:'.8rem', textAlign: 'center'}}>feels like</p>
          </div>

          <span style={{ color: 'white', marginTop: '1.1rem', fontSize: '1.1rem', opacity: '1' }}>
                {val}&nbsp;&deg;
          </span>
        </div>
        </>
    );
}

export default FeelsLike;