import React from 'react';
import './InformationLine.css';
import number2roman from './number2roman';
import color2english from './color2english';



function InformationLine(props) {
  let color = color2english(props.problem.farbe)

  let colorFill = color.name+'-fill';
  let colorText = color.name+'-text';

  return (
    <p className={"InformationLine "+colorText}>
      STUFE {number2roman(props.problem.grad)} · {props.problem.sektor} · {props.problem.schrauber} · {props.problem.stil}
    </p>
  )
}

export default InformationLine
