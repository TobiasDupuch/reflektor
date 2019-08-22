import React from 'react';

function StatusOverlay(props) {
  const possibleStates = ['nur neu','neu und alt','nur alt'];

  let list =[];
  let i = 0;
  possibleStates.forEach((status)=>{
    if (props.status === status) {
      list.push(
        <div className = "overlayButton active" onClick={props.changeStatus.bind(this,status)} key={i}>
          {status}
        </div>
      );
    }
    else{
      list.push(
        <div className = "overlayButton" onClick={props.changeStatus.bind(this,status)} key={i}>
          {status}
        </div>
      );
    }
    i++;
  })

  return (
    <div className="StatusOverlay overlay">

      {list}

    </div>
  );
}

export default StatusOverlay;
