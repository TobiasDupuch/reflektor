import React from 'react';
import './Button.css';

function Button(props){
  let color;
  if (props.color === undefined) {
    color= {
      name : "glow",
      code : "#D9FF42"
    }
  }
  else{
    color = props.color;
  }
  let upperPartSvg = <svg className= "untouchable" width="39" height="80" viewBox="0 0 39 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className= "untouchable" d="M0 79.9792L39 40.9792V0H0V79.9792Z" fill={color.code}/>
                  </svg>

  let lowerPartSvg = <svg width="39" height="51" viewBox="0 0 39 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 39.4566V51H39V0.456604L0 39.4566Z" fill={color.code}/>
                  </svg>

  let checkSvg = <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M7.31818 13.8523L1.82955 8.36364L0 10.1932L7.31818 17.5114L23 1.82955L21.1705 0L7.31818 13.8523Z" fill="black"/>
                 </svg>

  let flashSvg = <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 12.973L9.36 0L5.5 10.3784H13L2.6 24L7 12.973H0Z" fill="black"/>
                 </svg>

  let skipSvg = <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 15L8 8L1 1M8 15L15 8L8 1" stroke="black" strokeWidth="2.5"/>
                </svg>



  let icon = "";
  if (props.icon === "flash") {
    icon = flashSvg;
  }
  if (props.icon === "check") {
    icon = checkSvg;
  }
  if (props.icon === "skip") {
    icon = skipSvg;
  }

  function touchStart(e){
    e.preventDefault();
    activated = false;
    e.target.classList.remove('transitioning');
    // console.log('START: '+ e.touches[0].pageY);
    touchStartPos = e.touches[0].pageY;
    let el = e.target;
    elementStartPos = parseInt(window.getComputedStyle(el).getPropertyValue("margin-bottom"),10);
    // console.log('ELEMENT START: '+ elementStartPos);
  }

  function touchMove(e){
    e.preventDefault();
    // console.log('MOVE: '+ e.touches[0].pageY);
    // e.target.style.marginBottom = '-50px';
    touchDistance = touchStartPos - e.touches[0].pageY;
    // console.log('DISTANCE: '+ touchDistance);
    let el = e.target;
    elementPos = parseInt(window.getComputedStyle(el).getPropertyValue("margin-bottom"),10);
    // console.log('POSITION '+elementPos);

    if (touchDistance < 0 && activated === false) {
      //MOVING -> NOT SURE IF I NEEED THE MULTIPLIER ON ANDROID
      e.target.style.marginBottom = elementStartPos+touchDistance+'px';
    }
    if (elementPos < -50 && activated === false) {
      // console.log('NOW?');
      activated = true;
      setTimeout(function () {
      props.do();
    }, 100);

    }
  }

  function touchEnd(e){
    e.preventDefault();
    e.target.classList.add('transitioning');
    e.target.style.marginBottom = "-30px";
  }

  let touchStartPos;
  let touchDistance;
  let elementStartPos;
  let elementPos;
  let activated;

  // console.log(parseInt('-20px', 10));

  // let touchStartPosY = null;
  // function setTouchStart(e){
  //   e.preventDefault();
  //   e.target.classList.remove('transitioning');
  //   touchStartPosY = e.touches[0].pageY;
  // }
  //
  // function useButton(e){
  //   e.preventDefault();
  //   let distance = e.touches[0].pageY - touchStartPosY;
  //   console.log(distance);
  //   if (distance > 0 && distance < 25) {
  //     e.target.style.marginBottom = (-30 - (e.touches[0].pageY-touchStartPosY))+'px';
  //     if (parseInt(e.target.style.marginBottom, 10) < -49) {
  //       e.target.style.marginBottom='-50px';
  //       setTimeout(function () {
  //         props.do();
  //       }, 50);
  //     }
  //   }
  // }
  //
  //
  // function userLetGo(e){
  //   e.preventDefault();
  //   e.target.classList.add('transitioning');
  //   e.target.style.marginBottom = "-30px";
  // }

  let hiddenClass = '';
  if (props.deactivated === true) {
    hiddenClass = 'hidden';
  }

  return(
    <div className = {'Button '+hiddenClass} onClick={props.do}>
      <div className = "upper-part" onTouchStart = {touchStart} onTouchMove = {touchMove} onTouchEnd = {touchEnd}>
        {upperPartSvg}
        <div className = {"icon "+ props.icon + " untouchable"}>
          {icon}
        </div>
      </div>

      <div className = "lower-part">
        {lowerPartSvg}
      </div>



    </div>
  )
}

export default Button;
