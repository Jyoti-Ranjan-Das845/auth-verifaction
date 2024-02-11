import '../public/css/Elevation.css'


function Elevation({val1, val2}){

    return(
        <>
        <div className="elev">
        <img
            src="/assets/icons/additionals/thermometer.png"
            alt="feels-like"
            height={'30rem'}
            width={'30rem'}
            style={{ marginTop: '.9rem' }}
          />

          <div className="hr" style={{ width: '5rem', marginTop: '.9rem', opacity: '0.7' }}>
            <hr />
            <p style={{marginTop: '.4rem', color: 'white', fontSize:'.8rem', textAlign: 'center'}}>Elevation</p>
          </div>

          <span style={{ color: 'white', marginTop: '.2rem', fontSize: '1rem', opacity: '1' }}>
                {val1} <small><i className="fa-solid fa-arrow-up"></i></small>&nbsp;|&nbsp;{val2} <small><i className="fa-solid fa-arrow-down"></i></small>
          </span>
        </div>
        </>
    );
}

export default Elevation;