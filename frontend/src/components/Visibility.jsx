import '../public/css/Visibility.css'

function Visibility({val}){

    return(
        <>
          <div className="visib">
        <img
            src="/assets/icons/additionals/witness.png"
            alt="humidity"
            height={'30rem'}
            width={'30rem'}
            style={{ marginTop: '.9rem' }}
          />

<div className="hr" style={{width: '5rem',height: '1rem', marginTop: '.8rem', opacity: '0.7'}}>
            <hr style={{backgroundColor : 'white', marginTop : '-.1rem'}}/>
            <p style={{marginTop: '-.3rem', color: 'white', fontSize:'.8rem', textAlign: 'center'}}>Visibility</p>
          </div>

          <span style={{ color: 'white', marginTop: '1.1rem', fontSize: '1.1rem', opacity: '1' }}>
          {Math.floor(val/1000)}&nbsp;<small>Km</small>
          </span>
          
        </div>
        </>
    );
}

export default Visibility;