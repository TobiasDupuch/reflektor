import React from 'react';
import Anzahl from './Anzahl';
import Status from './Status';
import Stufe from './Stufe';
import Sektor from './Sektor';
import Button from './Button';
import './Settings.css';

function Settings(props){

let deactivated = false;
let zeroAlertClass = '';
if (props.parkour.length === 0) {
    deactivated = true;
    zeroAlertClass = 'zero';
}

let searchIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="13" cy="7" r="5.75" stroke="#D9FF42" strokeWidth="2.5"/>
<path d="M8.76777 11L0.88391 18.8838" stroke="#D9FF42" strokeWidth="2.5"/>
</svg>


let alert;
if (props.anzahl > props.parkour.length) {
  alert=
  <div className={"alert-container "+zeroAlertClass}>
    <div className = {"alert "+zeroAlertClass}>
      <div className="alertSignSvg">
        <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M11 13L11 7L12 7L12 13L11 13Z" fill="#D9FF42"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M11 16L11 15L12 15L12 16L11 16Z" fill="#D9FF42"/>
        <path d="M12.8856 1.2L21.9789 16.95C22.5947 18.0167 21.8249 19.35 20.5933 19.35H2.40673C1.17505 19.35 0.405252 18.0167 1.02109 16.95L10.1144 1.2C10.7302 0.133333 12.2698 0.133333 12.8856 1.2Z" stroke="#D9FF42" strokeWidth="0.8"/>
        </svg>
      </div>
      <div><p>{props.parkour.length}</p></div>
    </div>
  </div>
}




return (
    <div className = "Settings">
      <div className = "line">
        <p>Erstelle</p>
      </div>
        <Anzahl anzahl={props.anzahl} openOverlay={props.openOverlay}/>
      <div className = "line">
        <p>Parkour aus</p>
      </div>
        <Status status={props.status} openOverlay={props.openOverlay}/>
      <div className = "line">
        <p>Problemen</p>
      </div>
      <Stufe stufe={props.stufe} openOverlay={props.openOverlay}/>
      <Sektor sektor={props.sektor} openOverlay={props.openOverlay}/>
      {alert}
      <nav>
        <Button icon="check" do={props.startParkour} deactivated={deactivated}/>
        <div className="searchButton" onClick={props.openSearch}>{searchIcon}</div>
      </nav>
    </div>
  )
}

export default Settings;
