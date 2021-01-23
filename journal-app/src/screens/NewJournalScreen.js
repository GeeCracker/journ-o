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
        }
      ],
      currentQuestion: 0,
      currentChoice: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index){
    this.setState({currentChoice: index});
  }

  render() {
      return (
        <div style={{position:'absolute',backgroundColor: '#19456B',height:'100vh',width:'100vw'}}>

          <Topbar />
          <QuestionCard  
            question={this.state.questions[this.state.currentQuestion]}
            choice={this.state.currentChoice}
            handleClick={this.handleClick}
            />
        
        </div>
      );
    }
  }

export default NewJournal;