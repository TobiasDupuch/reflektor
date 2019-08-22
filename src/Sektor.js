import React from 'react';

function Sektor(props){
  let lines
  if (props.sektor === 'Alle') {
    return(
      <div className = "Sektor" onClick={props.openOverlay.bind(this,'sektor')}>
        <div className = "line">
          <p>in</p>
          <p className = "highlight right inline-right">allen</p>
        </div>
        <div className = "line">
          <p className = "highlight left">sektoren</p>
        </div>
      </div>
    )
  }
  else{
    return(
      <div className = "Sektor" onClick={props.openOverlay.bind(this,'sektor')}>
        <div className = "line">
          <p>im</p>
          <p className = "highlight right inline-right">Sektor</p>
        </div>
        <div className = "line">
          <p className = "highlight left">{props.sektor}</p>
        </div>
      </div>
    )
  }

}

export default Sektor;
