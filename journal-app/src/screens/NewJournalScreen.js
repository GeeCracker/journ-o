import React from 'react';

import QuestionCard from '../components/QuestionCard';
import Topbar from '../components/Topbar';

class NewJournal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: 1,
          type: 'mc',
          question: 'How much milk did you drink today?',
          choices: [
            {
              answer: 'so much.',
              targetid: 2,
              picked: 0
            },
            {
              answer: 'I suck a cow tiddy.',
              targetid: 3,
              picked: 0
            },
            {
              answer: 'I\'m lactose swactose my guy.',
              targetid: 4,
              picked: 0
            }
          ]
        },
        {
          id: 2,
          type: 'written',
          question: 'How do you doodoo today?',
          choices: []
        }
      ],
      currentQuestion: 0,
      currentChoice: 0,
      date: 'Jan 25, 2021',
      left: false,
      right: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // TODO questions
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
    // TODO generate next question function
    this.setState({currentQuestion: this.state.currentQuestion+1})
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
            type={this.state.questions[this.state.currentQuestion].type}
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