import React from 'react';
import './ScrollText.css';
import color2english from './color2english';


class ScrollText extends React.Component{
  constructor(props){
    super(props);

    this.ref4Scroll = React.createRef();

    this.state={
      text : this.props.text,
      color : this.props.color
    }

  }

  scroll(){
    let element = this.ref4Scroll.current;
    let parentWidth = parseInt(window.getComputedStyle(element.parentNode).width, 10);
    console.log(parentWidth);
    let elementWidth = parseInt(window.getComputedStyle(element).width, 10);
    console.log(elementWidth);
    console.log(element);

    if (elementWidth > parentWidth+65) {
      console.log((elementWidth-parentWidth)*-1+'px');
      this.scrollingInterval = setInterval(()=>{
        if (  element.style.marginLeft !== (elementWidth-parentWidth)*-1+'px') {
            element.style.marginLeft = (elementWidth-parentWidth)*-1+'px'
        }
        else{
              element.style.marginLeft = '0px';
        }
      },2500);

    }
  }

  componentDidMount(){
    this.scroll();
  }

  componentWillUnmount() {
   clearInterval(this.scrollingInterval);
 }

  render(){
    let color = color2english(this.state.color)

    let colorFill = color.name+'-fill';
    let colorText = color.name+'-text';

    return(
      <div className="ScrollText line" ref={this.ref4Scroll}>
         <p className={"highlight center "+colorFill}>{this.state.text}</p>
      </div>
    )
  }
}

export default ScrollText;
