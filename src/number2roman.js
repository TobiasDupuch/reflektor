function number2roman(number){
  if (number === 1 || number === '1') {
    return 'I'
  }
  if (number === 2 || number === '2') {
    return 'II'
  }
  if (number === 3 || number === '3') {
    return 'III'
  }
  if (number === 4 || number === '4') {
    return 'IIII'
  }
  if (number === 5 || number === '5') {
    return 'IIII/'
  }
}

export default number2roman;
