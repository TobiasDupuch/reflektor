import React from 'react';
import './App.css';
import db from './firebase';
import Settings from './Settings';
import AnzahlOverlay from './AnzahlOverlay';
import StatusOverlay from './StatusOverlay';
import StufeOverlay from './StufeOverlay';
import SektorOverlay from './SektorOverlay';
import Parkour from './Parkour';
import Search from './Search';
import problems from './problems.js';

import { pink,green,blue,yellow,red,white,gold,violet,orange,silver} from './colors';
import { CSSTransition } from 'react-transition-group';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content : 'settings',

      overlay : {
        visible : false,
        content : 'anzahl'
      },

      anzahl : 3,
      status : 'neu und alt',
      stufe : 'I & II',
      sektor : 'Gummiboot',
      parkour : [{
         "name": "Affenparty",
         "url": "http://topo.blockfeld.ch/topo/show/877",
         "grad": "2",
         "sektor": "Flamme",
         "stil": "Kinder",
         "schrauber": "Tom Godano",
         "farbe": "96D668",
         "map": "http://topo.blockfeld.ch/assets/img/boulder/boulder_877.png"
       }],
      counter : 1,
      totalProblems : 0
    };

    this.save = [];


    //good ol' binding:
    this.openOverlay = this.openOverlay.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.changeAnzahl = this.changeAnzahl.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.changeStufe = this.changeStufe.bind(this);
    this.changeSektor = this.changeSektor.bind(this);

    this.createParkour = this.createParkour.bind(this);
    this.startParkour = this.startParkour.bind(this);
    this.solveProblem = this.solveProblem.bind(this);
    this.nextProblem = this.nextProblem.bind(this);

    this.openSpecificProblem = this.openSpecificProblem.bind(this);
    this.openSearch = this.openSearch.bind(this);


  }


  openOverlay(type){
    this.setState({
      overlay : {
        visible : true,
        content : type
      }
    }
    )
  }

  closeOverlay(){
    this.setState({
      overlay : {
        visible : false,
        content : 'anzahl'
      }
    }
    )
  }

  changeAnzahl(newValue){
    this.setState({anzahl : newValue},()=>{
      this.createParkour();
    });
    setTimeout(()=>{
      this.closeOverlay();
    }, 250);

  };

  changeStatus(newValue){
    this.setState({status : newValue},()=>{
      this.createParkour();
    });
    setTimeout(()=>{
      this.closeOverlay();
    }, 250);

  };

  changeStufe(newValue){
    this.setState({stufe : newValue},()=>{
      this.createParkour();
    });
    setTimeout(()=>{
      this.closeOverlay();
    }, 250);

  };

  changeSektor(newValue){
    this.setState({sektor : newValue},()=>{
      this.createParkour();
    });
    setTimeout(()=>{
      this.closeOverlay();
    }, 250);

  };

  loadSaveFile(){
    db.collection("solvedProblems")
    .get()
    .then((querySnapshot)=> {
        querySnapshot.forEach((doc)=>{
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            this.save.push(doc.data());
        });
        // console.log(this.save);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }


  createParkour(){
    function stufe2numbers(stufeGerman) {
      if (stufeGerman === 'I') {
        return [1];
      }
      if (stufeGerman === 'I & II') {
        return [1,2];
      }
      if (stufeGerman === 'II') {
        return [2];
      }
      if (stufeGerman === 'II & III') {
        return [2,3];
      }
      if (stufeGerman === 'III') {
        return [3];
      }
      if (stufeGerman === 'III & IIII') {
        return [3,4];
      }
      else{
        console.log('ERROR IN CONVERTING: '+stufeGerman+' TO NUMBER');
      }
    }

    // console.log('STARTING PARKOUR CREATION');
    // console.log('START FILTERING');

    //filterProblems
    let gesuchteStufe = stufe2numbers(this.state.stufe);
    let filteredForStufe = problems.filter((problem)=>{
      if (gesuchteStufe.includes(parseInt(problem.grad))) {
        return true
      }
      else{
        return false
      }
    })
    // console.log('FILTERED FOR STUFE:');
    // console.log(filteredForStufe);

    let filteredForSektor;
    if (this.state.sektor === 'Alle') {
      filteredForSektor = filteredForStufe;
    }
    else{
      filteredForSektor = filteredForStufe.filter((problem)=>{
        if (this.state.sektor === problem.sektor) {
          return true
        }
        else{
          return false
        }
      })
    }
    // console.log('FILTERED FOR SEKTOR:');
    // console.log(filteredForSektor);

    let filteredForStatus;
    // console.log('COMPARING TO SAVEFILE:');
    if (this.state.status === 'neu und alt') {
      filteredForStatus = filteredForSektor;
    }
    else if (this.state.status === 'nur alt'){
      console.log('NUR ALT');
      filteredForStatus = filteredForSektor.filter((problem)=>{
        for (var i = 0; i < this.save.length; i++) {

          if (this.save[i].name === problem.name) {
            // console.log('P COMPARING: '+this.save[i].name+' TO '+problem.name);
            return true
          }

          else{
            // console.log('N COMPARING: '+this.save[i].name+' TO '+problem.name);
          }
        }
        return false
      })
    }

    else if (this.state.status === 'nur neu'){
      console.log('NUR NEU');
      filteredForStatus = filteredForSektor.filter((problem)=>{
        for (var i = 0; i < this.save.length; i++) {

          if (this.save[i].name === problem.name) {
            console.log('P COMPARING: '+this.save[i].name+' TO '+problem.name);
            return false
          }

          else{
            console.log('N COMPARING: '+this.save[i].name+' TO '+problem.name);
          }
        }
        return true
      })
    }
    // console.log('FILTERED FOR STATUS:');
    // console.log(filteredForStatus);

    let filteredProblems = filteredForStatus;



//ACTUALLY CREATING PARKOUR
    let parkour = [];
    let routeLength;
    if (this.state.anzahl > filteredProblems.length) {
      console.log('THE FILTERED LIST IS SMALLER THAN THE REQUESTED PROBLEMS');
      routeLength = filteredProblems.length;
    }
    else{
      routeLength = this.state.anzahl;
    }

    while(parkour.length < routeLength){
      let candidate = filteredProblems[Math.floor(Math.random() * filteredProblems.length)];
      // console.log(candidate);
      if (parkour.includes(candidate)) {
        continue
      }
      else{
        parkour.push(candidate);
      }
    }
    console.log('PARKOUR CREATED');
    console.log(parkour);
    // this.state.parkour = parkour; WTF? WEIRD FIX, 20.8.2019
    this.setState({
      parkour : parkour
    })
  }

  startParkour(){
    this.setState({
      content : 'parkour',
      totalProblems : this.state.parkour.length
    })
  }

  openSearch(){
    this.setState({
      content : 'search'
    })
  }

  openSpecificProblem(parkour){
    this.setState({
      parkour : parkour,
      totalProblems : 1,
      content : 'parkour'
    });

  }

  solveProblem(flash){
    //save to savefile
    // Add a new document in collection "cities"
    db.collection("solvedProblems").add({
      name: this.state.parkour[0].name,
      url: "http://topo.blockfeld.ch/topo/show/879",
      grad: "2",
      sektor: "Welle",
      stil: "Platte",
      schrauber: "Alex Schickli",
      farbe: "D98BB2",
      map: "http://topo.blockfeld.ch/assets/img/boulder/boulder_879.png",
      flash: flash,
    })
    .then(() => {
      console.log("Document successfully written!");
      let remainingProblems = this.state.parkour;
      remainingProblems.shift();
      console.log(remainingProblems);
      if (remainingProblems.length < 1) {
        this.setState({
          content : 'settings',
          counter : 1
        })
        this.loadSaveFile();
        this.createParkour();
      }
      else{
        this.setState({
          parkour : remainingProblems,
          counter : this.state.counter+1
        })
      }
    })
      .catch(function(error) {
    console.error("Error writing document: ", error);
    alert("Error saving this");

    });
  }

  nextProblem(){
    let remainingProblems = this.state.parkour;
    remainingProblems.shift();
    console.log(remainingProblems);
    if (remainingProblems.length < 1) {
      this.setState({
        content : 'settings',
        counter : 1
      })
      this.loadSaveFile();
      this.createParkour();
    }
    else{
      this.setState({
        parkour : remainingProblems,
        counter : this.state.counter+1
      })
    }
  }

  componentWillMount(){
    console.log('LOADING SAVEFILE');
    this.loadSaveFile();
    this.createParkour();
  }



  render() {
    let content;
    if (this.state.content === 'settings') {
      content = <Settings
                    anzahl={this.state.anzahl}
                    status={this.state.status}
                    stufe={this.state.stufe}
                    sektor={this.state.sektor}
                    openOverlay={this.openOverlay}
                    startParkour={this.startParkour}
                    parkour={this.state.parkour}
                    openSearch={this.openSearch}/>;
    }

    if (this.state.content === 'parkour') {
      let listOfProblems = [];
      let i=1;
      this.state.parkour.forEach((problem)=>{
        listOfProblems.unshift(<Parkour save={this.save} problem={problem} number={this.state.counter} from={this.state.totalProblems} solveProblem={this.solveProblem} nextProblem={this.nextProblem} key={i}/>);
        i++;
      })
      content = listOfProblems;

    }

    if (this.state.content === 'search') {
      content = <Search availableProblems={problems} openSpecificProblem={this.openSpecificProblem}/>;
    }

    let overlay;
    if (this.state.overlay.visible === true) {
      if (this.state.overlay.content === 'anzahl') {
        overlay = <AnzahlOverlay anzahl={this.state.anzahl} changeAnzahl={this.changeAnzahl}/>;
      }
      if (this.state.overlay.content === 'status') {
        overlay = <StatusOverlay status={this.state.status} changeStatus={this.changeStatus}/>;
      }
      if (this.state.overlay.content === 'stufe') {
        overlay = <StufeOverlay stufe={this.state.stufe} changeStufe={this.changeStufe}/>;
      }
      if (this.state.overlay.content === 'sektor') {
        overlay = <SektorOverlay sektor={this.state.sektor} changeSektor={this.changeSektor}/>;
      }
    }



    return (
      <div className="App">
        {content}
        {overlay}

      </div>
    );
  }
}


export default App;
