import React from 'react';

import QuestionCard from '../components/QuestionCard';
import Topbar from '../components/Topbar';

import masterQuestions from '../assets/Questions.json';

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
      currentQuestion: 0,
      currentChoice: 0, // current mc question choice index
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
    // get question from FinalQuestion list
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
    this.setState({title: title});
  }

  saveResponse() {
    // save question response to journal list
    var sentence = this.state.questions[this.state.currentQuestion].output+" ";
    this.setState({content: this.state.content + sentence});
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
        // if current stage is initial, move on to final question
        if(this.state.stage == 0){
          this.saveTitleResponse();
          this.generateFinalQuestion();
        // if current stage is final question, move onto main questions stage
        } else if(this.state.stage >= 1){
          this.saveResponse();
          this.generateNextQuestion();
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
      this.state.content
    ]
    alert(newEntry[0]);
    alert(newEntry[1]);
    alert(newEntry[2]);
  }

  render() {
    console.log(this.state.content);
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
          <button class="done-full-button" onClick={this.finishJournal}>Finish Journ-o</button>
          : null}
        </div>
      );
    }
  }

export default NewJournal;