import React from 'react';

import './styles.css';

import { Link } from 'react-router-dom';

class JournalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            journals: [
                {
                    title: 'I went on a walk',
                    date: 'Jan 23, 2021',
                    content: 'Text text text.'
                },
                {
                    title: 'I went on a walk',
                    date: 'Jan 23, 2021',
                    content: 'Text text text.'
                }
            ]
        };
    }
    
    render() {
        return (
            <div>

            {this.state.journals.map((item, index) => (
                <div class="journal-box">
                
                <div class="date">{item.date}</div>
                <div class="entry">
                    <div class="title">{item.title}</div>
                    <div class="content">{item.content}</div>
                </div>

                </div>
            ))}

            </div>
        );
    }
}

export default JournalList;