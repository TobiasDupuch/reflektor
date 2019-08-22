import React from 'react';

function AnzahlOverlay(props) {

  const possibleNumbers = [3,5,7,10,12,20];

  let list = [];
  let i = 0;
  possibleNumbers.forEach((anzahl)=>{

    if (anzahl === props.anzahl) {
      list.push(
        <div className = "overlayButton number-line active" onClick={props.changeAnzahl.bind(this,anzahl)} key={i}>
          {anzahl}
        </div>
      )
    }
    else {
      list.push(
        <div className = "overlayButton number-line" onClick={props.changeAnzahl.bind(this,anzahl)} key={i}>
          {anzahl}
        </div>
      )
    }
    i++;
  })

  return (
    <div className="AnzahlOverlay overlay">

      {list}


    </div>
  );
}

export default AnzahlOverlay;
