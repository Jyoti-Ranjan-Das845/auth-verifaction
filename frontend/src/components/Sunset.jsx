import'../public/css/Sunset.css';

function Sunset({ sunset, country }) {
    return (
      <>
        <div className="sunset">
          <img
            src="/assets/icons/sunTime/sunset.png"
            alt="sunset"
            height={'60rem'}
            width={'60rem'}
            style={{ marginTop: '.5rem' }}
          />
          <div className="hr" style={{width: '5rem',height: '1rem', marginTop: '.5rem', opacity: '0.7'}}>
            <hr style={{backgroundColor : 'white', marginTop : '-.1rem'}}/>
            </div>
          <span style={{color : 'white', marginTop : '.1rem', fontSize : '.9rem', opacity : '0.7'}}>
            {sunset} | {country}
          </span>
        </div>
      </>
    );
  }

export default Sunset;