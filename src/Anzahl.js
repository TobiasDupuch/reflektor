import React from 'react';

function Anzahl(props){

  function number2German(number){
    if (number === 3) {
      return 'Drei'
    }
    if (number === 5) {
      return 'Fünf'
    }
    if (number === 7) {
      return 'Sieben'
    }
    if (number === 10) {
      return 'Zehn'
    }
    if (number === 12) {
      return 'Zwölf'
    }
    if (number === 20) {
      return 'Zwanzig'
    }
  }

  return(
    <div className = "Anzahl" onClick={props.openOverlay.bind(this,'anzahl')}>

    <div className = "line">
      <p>einen</p>
      <p className = "highlight right inline-right">{number2German(props.anzahl)}</p>
    </div>
    <div className = "line">
      <p className = "highlight left">teiligen</p>
    </div>

    </div>
  )
}

export default Anzahl;
