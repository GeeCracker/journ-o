import React from 'react';

import QuestionCard from '../components/QuestionCard';
import Topbar from '../components/Topbar';

import masterQuestions from '../assets/Questions.json';
import firebase from '../firebase.js';
import { Redirect } from 'react-router';

class NewJournal extends React.Component {
  constructor(props) {
    super(props);

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var today = new Date();
    var date = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();

    this.state = {
      questions: [],
      title: '',
      date: date,
      content: '',
      lastsentence: '',
      currentQuestion: 0,
      currentChoice: 0, // current mc question choice index
      stage: 0, // stage of questions, 0-starting, 1-final, 2-main
      answer: '',
      doneentry: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.answerChanged = this.answerChanged.bind(this);
  }

  componentWillMount() {
    // Getting initial starting question
    var validIds = masterQuestions.StartingQuestions[0];
    var rand = Math.floor(Math.random() * validIds.length) + 0 ;
    var q = masterQuestions.StartingQuestions[validIds[rand]];
    this.setState({
      questions: [...this.state.questions, q],
    });
  }

  generateFinalQuestion() {
    // get question from Final Question list
    this.setState({stage: 1});
    var validIds = masterQuestions.FinalQuestions[0];
    var rand = Math.floor(Math.random() * validIds.length) + 0;
    var q = masterQuestions.FinalQuestions[validIds[rand]];
    this.setState({
      questions: [...this.state.questions, q],
    });
    this.setState({currentQuestion: this.state.currentQuestion+1})
  }

  generateNextQuestion() {
    this.setState({stage: 2});
    var validIds = masterQuestions.MainQuestions[0];
    var rand = Math.floor(Math.random() * validIds.length) + 0;
    var q = masterQuestions.MainQuestions[validIds[rand]];
    this.setState({
      questions: [...this.state.questions, q],
    });
    this.setState({currentQuestion: this.state.currentQuestion+1})
  }

  answerChanged(event) {
    this.setState({answer: event.target.value});
  }

  gotoNextQuestion() {
    // question when we have a targetid
    var qid = this.state.questions[this.state.currentQuestion].choices[this.state.currentChoice].targetid;
    var q
    if(this.state.stage == 0) {
      q = masterQuestions.StartingQuestions[qid];
    } else if(this.state.stage == 1){
      q = masterQuestions.FinalQuestions[qid];
    } else {
      q = masterQuestions.MainQuestions[qid];
    }
    this.setState({
      questions: [...this.state.questions, q],
    });
    this.setState({currentQuestion: this.state.currentQuestion+1})
  }

  saveMCResponse() {
    // save question response to journal list
    var sentence = this.state.questions[this.state.currentQuestion].choices[this.state.currentChoice].output+" ";
    this.setState({content: this.state.content + sentence});
  }

  saveTitleResponse() {
    // save title to journal
    // only called when final inital question is answered.
    var title = this.state.questions[this.state.currentQuestion].title;
    var sentence = this.state.questions[this.state.currentQuestion].question+" "+this.state.answer+". ";
    this.setState({title: title});
    this.setState({content: this.state.content + sentence});
    this.setState({answer: ''});
  }

  saveFinalResponse() {
    // save question response to journal list
    var sentence = this.state.questions[this.state.currentQuestion].output+" "+this.state.answer+". ";
    this.setState({lastsentence: sentence});
    this.setState({answer: ''});
  }

  saveResponse() {
    // save question response to journal list
    var sentence = this.state.questions[this.state.currentQuestion].output+" "+this.state.answer+". ";
    this.setState({content: this.state.content + sentence});
    this.setState({answer: ''});
  }


  handleClick(index){
    this.setState({currentChoice: index});
  }

  leftClick = () => {
    // left arrow click function
    this.setState({currentQuestion: this.state.currentQuestion-1})
  }

  rightClick = () => {
    // right arrow click function
    if (this.state.currentQuestion == this.state.questions.length-1) {
      if(this.state.questions[this.state.currentQuestion].type == "mc") {
        this.saveMCResponse();
        this.gotoNextQuestion();
      } else {
        if(this.state.answer){
          // if current stage is initial, move on to final question
          if(this.state.stage == 0){
            this.saveTitleResponse();
            this.generateFinalQuestion();
          // if current stage is final question, move onto main questions stage
          } else if(this.state.stage == 1) {
            this.saveFinalResponse();
            this.generateNextQuestion();
          } else if(this.state.stage > 1){
            this.saveResponse();
            this.generateNextQuestion();
          }
        } else {
          alert("Don't leave the text field blank!")
        }
      }
    } else {
      this.setState({currentQuestion: this.state.currentQuestion+1})
    }
  }

  widthCalc() {
    // progress bar animation
    var num = (this.state.currentQuestion+1)/20*100;
    if(num >= 100){
      num = 100;
    }
    var str = num.toString()+"%";
    return str;
  }

  finishJournal = () => {
    // finish Journ=o button function
    var newEntry = [
      this.state.title,
      this.state.date,
      this.state.content+this.state.lastsentence
    ]
    var uid = sessionStorage.getItem('uid')
    var entrynum
    firebase.database().ref('/users/'+uid+'/journals').on("value", function(snapshot){
      entrynum = snapshot.numChildren();
  })
    firebase.database().ref('/users/'+uid+ '/journals/' + (entrynum+1)).set({
      title: newEntry[0],
      date: newEntry[1],
      content: newEntry[2],
    })
    this.setState({doneentry: true})
  }

  render() {
    if(this.state.doneentry === true){
      return <Redirect to='/profile'/>
    }
    
    var left = this.state.currentQuestion != 0;
    var right = true;
    var finish = this.state.currentQuestion >= 5;
    var mc = this.state.questions[this.state.currentQuestion].type == "mc";
    const prog = {
      backgroundColor: '#16C79A',
      height: '100%',
      width: this.widthCalc(),
      transition: '0.5s ease'
    };
      return (
        <div style={{position:'absolute',backgroundColor: '#19456B',height:'100vh',width:'100vw'}}>

          <Topbar />

          <div class="new-title">{this.state.date}</div>

          <div class="progbar">
            <div style={prog} />
          </div>

          <QuestionCard  
            question={this.state.questions[this.state.currentQuestion]}
            type={mc}
            choice={this.state.currentChoice} // active button on mc questions
            handleClick={this.handleClick} // button click for an mc question
            answerChanged={this.answerChanged}
            answer={this.state.answer}
            />
          
          <div class="navbar-box">
            {right ? <div class="arrow-right" onClick={this.rightClick}/> : null}
          </div>

          {finish ? 
          <button class="done-full-button" onClick={this.finishJournal}>Finish Journ-o</button>
          : null}
        </div>
      );
    }
  }

export default NewJournal;