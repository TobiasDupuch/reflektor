import React from 'react';

function Status(props){
  let firstLine;
  let secondLine;
  if (props.status==="neu und alt") {
    firstLine = "neuen und";
    secondLine = "alten";
  }
  if (props.status==="nur neu") {
    firstLine = "neuen";
    secondLine = "";
  }
  if (props.status==="nur alt") {
    firstLine = "alten";
    secondLine = "";
  }
  let firstLineElement = "";
  let secondLineElement = "";

  if (props.status==='neu und alt') {
    firstLineElement =
      <div className = "line">
        <p className = "highlight right">{firstLine}</p>
      </div>

    secondLineElement = "";
    if (secondLine !== "") {
      secondLineElement =
        <div className = "line">
          <p className = "highlight left">{secondLine}</p>
        </div>
    }
  }
  else{
    firstLineElement =
      <div className = "line">
        <p className = "highlight left">{firstLine}</p>
      </div>

    secondLineElement = "";
    if (secondLine !== "") {
      secondLineElement =
        <div className = "line">
          <p className = "highlight left">{secondLine}</p>
        </div>
    }
  }


  return(
    <div className = "Status" onClick = {props.openOverlay.bind(this,'status')}>
    {firstLineElement}
    {secondLineElement}
    </div>
  )
}

export default Status;
