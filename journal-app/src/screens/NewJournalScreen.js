import React from 'react';

import QuestionCard from '../components/QuestionCard';
import Topbar from '../components/Topbar';

import masterQuestions from '../assets/Questions.json';

class NewJournal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: 0,
      currentChoice: null, // current mc question choice index
      date: 'Jan 25, 2021',
      stage: 0 // stage of questions, 0-starting, 1-final, 2-main
    };

    this.handleClick = this.handleClick.bind(this);
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
    var validIds = masterQuestions.StartingQuestions[0];
    var rand = Math.floor(Math.random() * validIds.length) + 0 ;
    var q = masterQuestions.StartingQuestions[validIds[rand]];
    this.setState({
      questions: [...this.state.questions, q],
    });
  }

  generateNextQuestion() {

  }

  gotoNextQuestion() {
    // question when we have a targetid
    var qid = this.state.questions[this.state.currentQuestion].choices[this.state.currentChoice].targetid;
    var q
    if(this.state.stage == 0) {
      q = masterQuestions.StartingQuestions[qid];
    }
    this.setState({
      questions: [...this.state.questions, q],
    });
    this.setState({currentQuestion: this.state.currentQuestion+1})
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
      if(this.state.currentChoice) {
        this.gotoNextQuestion();
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

  render() {
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
            />
          
          <div class="navbar-box">
            {left ? <div class="arrow-left" onClick={this.leftClick}/> : null}
            {right ? <div class="arrow-right" onClick={this.rightClick}/> : null}
          </div>

          {finish ? 
          <button class="done-full-button" onClick={this.newJournal}>Finish Journ-o</button>
          : null}
        </div>
      );
    }
  }

export default NewJournal;