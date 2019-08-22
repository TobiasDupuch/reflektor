import React from 'react';

function SektorOverlay(props) {

  const possibleSektoren = [
    'Alle',
    'Amboss',
    'Findling',
    'Flamme',
    'Formaggini',
    'Gummiboot',
    'Ikarus',
    'Monoblock',
    'Nocino',
    'Promenade',
    'Supernova',
    'Walfisch',
    'Welle',
    'Zerstörer'
  ]

  let list = [];
  let i = 0;
  possibleSektoren.forEach((sektor)=>{
    if (props.sektor === sektor) {
      list.push(
        <div className = "overlayButton active" onClick={props.changeSektor.bind(this,sektor)} key={i}>
          {sektor}
        </div>
      )
    }
    else{
      list.push(
        <div className = "overlayButton" onClick={props.changeSektor.bind(this,sektor)} key={i}>
          {sektor}
        </div>
      )

    }
    i++;
  })

  return (
    <div className="SektorOverlay overlay">

      {list}

    </div>
  );
}

export default SektorOverlay;
