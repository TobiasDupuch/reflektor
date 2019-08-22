import React from 'react';
import './Search.css';
import ScrollText from './ScrollText';
import InformationLine from './InformationLine';



class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      openSpecificProblem : props.openSpecificProblem,
      allProblems : props.availableProblems,
      foundProblems : props.availableProblems
    }
  }

  search(e){
    let query = e.currentTarget.value;
    let results = [];
    // console.log(query);
    this.state.allProblems.forEach((problem)=>{
      if (problem.name.toUpperCase().includes(query.toUpperCase())) {
        results.push(problem);
      }
    })
    this.setState({
      foundProblems:results
      })
  }




  render(){
    let drawResults = [];
    this.state.foundProblems.forEach((problem)=>{
      drawResults.push(
        <div className="result-item" key={problem.name} onClick={this.state.openSpecificProblem.bind(this,[problem])}>
          <ScrollText text={problem.name} color={problem.farbe}/>
          <InformationLine problem={problem}/>
        </div>);
    })





    return(
      <div className = "Search">
        <input autoFocus onKeyUp={this.search.bind(this)} placeholder="suchen"/>
        <div className="results">
        {drawResults}
        </div>
      </div>
    )
  }
}

// function Search(props){
//   let drawResults = [<div key="je">YO</div>];
//   let results;
//
//   function search(e){
//     let query = (e.currentTarget.value);
//     results = [];
//     drawResults = [];
//
//     props.availableProblems.forEach((problem)=>{
//       if (problem.name.toUpperCase().includes(query.toUpperCase())) {
//         results.push(problem);
//         drawResults.push(<div className="resultsItem" key={problem.name}>{problem.name}</div>);
//         console.log(drawResults);
//       }
//
//     })
//     console.log(drawResults);
//   }
//
// }

export default Search;
