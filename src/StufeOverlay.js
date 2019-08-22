import React from 'react';

function StufeOverlay(props) {

  const possibleStufen = ['I','I & II','II','II & III','III','III & IIII'];
  let list = [];
  let i = 0;
  possibleStufen.forEach((stufe)=>{
    if (props.stufe === stufe) {
      list.push(
        <div className = "overlayButton active" onClick={props.changeStufe.bind(this,stufe)} key={i}>
          {stufe}
        </div>
      )
    }
    else{
      list.push(
        <div className = "overlayButton" onClick={props.changeStufe.bind(this,stufe)} key={i}>
          {stufe}
        </div>
      )
    }
    i++;
  })
  return (
    <div className="StufeOverlay overlay">

      {list}

    </div>
  );
}

export default StufeOverlay;
