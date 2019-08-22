import React from 'react';

function Stufe(props){
  let firstLine;
  let secondLine;

  if (props.stufe==="I") {
    firstLine = "Stufe I";
    secondLine = "";
  }

  if (props.stufe==="I & II") {
    firstLine = "Stufen";
    secondLine = "I und II";
  }

  if (props.stufe==="II") {
    firstLine = "Stufe II";
    secondLine = "";
  }

  if (props.stufe==="II & III") {
    firstLine = "Stufen";
    secondLine = "II und III";
  }

  if (props.stufe==="III") {
    firstLine = "Stufe II";
    secondLine = "";
  }

  if (props.stufe==="III & IIII") {
    firstLine = "Stufen";
    secondLine = "III und IIII";
  }

  let firstLineElement = "";
  if (secondLine !== "") {
    firstLineElement =
      <div className = "line">
        <p>der</p>
        <p className = "highlight right inline-right">{firstLine}</p>
      </div>
  }
  else {
    firstLineElement =
      <div className = "line">
        <p>der</p>
        <p className = "highlight middle">{firstLine}</p>
      </div>
  }


  let secondLineElement = "";
  if (secondLine !== "") {
    secondLineElement =
      <div className = "line">
        <p className = "highlight left">{secondLine}</p>
      </div>
  }

  return(
    <div className = "Stufe" onClick={props.openOverlay.bind(this,'stufe')}>
      {firstLineElement}
      {secondLineElement}
    </div>
  )
}

export default Stufe;
