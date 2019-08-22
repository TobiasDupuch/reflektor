import React, { useState } from 'react';
import './Parkour.css'
import Button from './Button';
import color2english from './color2english';
import number2roman from './number2roman';



function Parkour(props) {
  // Declare a new state variable, which we'll call "count" <- First time using Hooks. 21.8.2019
 const [showMap, setShowMap] = useState(false);


  let problem = props.problem;





  let color = color2english(problem.farbe)

  let colorFill = color.name+'-fill';
  let colorText = color.name+'-text';

  //Breaking the name into two lines if nescessary
  function breakLines(text){
    let multiLineName = {
      first : "",
      second : ""
    };

    let splitedText = text.split(" ");
    if (splitedText.length > 2) {
      for (var i = 0; i < 2; i++) {
        if (i > splitedText.length) { //??
          break;
        }
        multiLineName.first = multiLineName.first+splitedText[i]+" ";
      }
      multiLineName.first = multiLineName.first.slice(0, -1);

      for (i = 2; i < splitedText.length; i++) {
        multiLineName.second = multiLineName.second+splitedText[i]+" ";
      }
      multiLineName.second = multiLineName.second.slice(0, -1);

    }
    else {
      multiLineName.first = text;
      multiLineName.second = "";
    }
    return multiLineName;
  }

  let firstLine = <div className = "line">
                      <p className = {"highlight left " +colorFill}>{breakLines(problem.name).first}</p>
                  </div>

  let secondLine;
  if (breakLines(problem.name).second !== "") {
    secondLine =  <div className = "line">
                      <p className = {"highlight left " +colorFill}>{breakLines(problem.name).second}</p>
                  </div>
  }
  else{
    secondLine = <div className = "squeezer"/>
  }

  let navigation =
    <nav>
      <Button icon = "skip" color={color} do={props.nextProblem.bind(this,true)}/>
      <Button icon = "flash" color={color} do={props.solveProblem.bind(this,true)}/>
      <Button icon = "check" color={color} do={props.solveProblem.bind(this,false)}/>
    </nav>

  // console.log(props.save);
  props.save.forEach((solvedProblem)=>{
    // console.log('COMPARING: '+solvedProblem.name +' to '+ props.problem.name);
    if (solvedProblem.name === props.problem.name) {
      navigation = <nav>
                      <Button icon = "skip" color={color} do={props.nextProblem.bind(this,true)}/>
                      <Button icon = "check" color={color} do={props.nextProblem}/>
                  </nav>
                }
    })


  let map = null;
  if (showMap === true) {
    map = <div className = {"map "+props.problem.sektor.toLowerCase()} onTouchEnd={() => setShowMap(false)} onMouseUp={() => setShowMap(false)}>
            <p className = "schrauber-info">GESCHRAUBT VON {props.problem.schrauber.toUpperCase()}</p>
          </div>
  }
  else{
    map = <div className = "map invisible" onTouchEnd={() => setShowMap(false)} onMouseUp={() => setShowMap(false)}>
            <p className = "schrauber-info">GESCHRAUBT VON {props.problem.schrauber.toUpperCase()}</p>
          </div>
  }



  return (
    <div className="Parkour">
      <div className = {"line problem-number "+colorText}>
        {props.number} - {props.from}
      </div>
      {firstLine}
      {secondLine}


      <div className = {"stufe-gross "+colorText}>
        {number2roman(problem.grad)}
      </div>

      <div className = {"sektor-gross "+colorText}>
        {problem.sektor}
      </div>

      <div className="map-clicker" onTouchStart={() => setShowMap(true)} onTouchEnd={() => setShowMap(false)} onMouseDown={() => setShowMap(true)} onMouseUp={() => setShowMap(false)}>
        Click me
      </div>

      {navigation}

      {map}


    </div>
  );
}

export default Parkour;
