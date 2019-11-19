function color2english(colorcode){
  if (colorcode === 'D98BB2') {
    return {
      name : 'pink',
      code : '#D98BB2'
    }
  }
  if (colorcode === '96D668') {
    return {
      name : 'green',
      code : '#96D668'
    }
  }
  if (colorcode === '44ABD8') {
    return {
      name : 'blue',
      code : '#44ABD8'
    }
  }
  if (colorcode === 'FFEB00') {
    return {
      name : 'yellow',
      code : '#FFEB00'
    }
  }
  if (colorcode === 'FFFFFF') {
    return {
      name : 'white',
      code : '#FFFFFF'
    }
  }
  if (colorcode === 'C7362D') {
    return {
      name : 'red',
      code : '#C7362D'
    }
  }
  if (colorcode === 'B49D5B') {
    return {
      name : 'gold',
      code : '#B49D5B'
    }
  }
  if (colorcode === '943C8A') {
    return {
      name : 'violet',
      code : '#943C8A'
    }
  }
  if (colorcode === 'DA8A1C') {
    return {
      name : 'orange',
      code : '#DA8A1C'
    }
  }
  if (colorcode === 'BCC0C4' || colorcode === 'BCCQC4') {
    return {
      name : 'silver',
      code : '#BCC0C4'
    }
  }
  else{
    console.log(colorcode + "not found");
  }

}

export default color2english;
