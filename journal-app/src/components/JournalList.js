import React from 'react';

import './styles.css';

import { Link } from 'react-router-dom';
import firebase from '../firebase.js';

class JournalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            journals: []
        };
    }
    getJournalIDs(){
        var jids = []
        var uid = sessionStorage.getItem('uid')
        var journalRef = firebase.database().ref("users/"+uid+"/journals");
        journalRef.on("value", function(snapshot) {
            snapshot.forEach(function(data) {
              jids.push(data.key)
            });
          });
        return jids
    }
    getJournalTitle(jid,uid){
        var title
        firebase.database().ref('/users/'+uid+'/journals/'+jid+"/title").on("value", function(snapshot){
            title = snapshot.val();
        })
        console.log(title)
        return title
    }
    getJournalDate(jid,uid){
        var date
        firebase.database().ref('/users/'+uid+'/journals/'+jid+"/date").on("value", function(snapshot){
            date = snapshot.val();
        })
        console.log(date)
        return date
    }
    getJournalContent(jid,uid){
        var content
        firebase.database().ref('/users/'+uid+'/journals/'+jid+"/content").on("value", function(snapshot){
            content = snapshot.val();
        })
        console.log(content)
        return content
    }

    async componentWillMount(){
        var jids = this.getJournalIDs()
        console.log(jids)
        var uid = sessionStorage.getItem('uid')
        for (var i = 0; i < jids.length; i++){
             await this.setState({journals: [...this.state.journals,[
                this.getJournalTitle(jids[i],uid),
                this.getJournalDate(jids[i],uid),
                this.getJournalContent(jids[i],uid)
            ]],
                })
        }
        console.log(this.state.journals)
    }

    render() {

        return (
            <div>

            {this.state.journals.reverse().map((item, index) => (
                <div class="journal-box">
                
                <div class="date">{item[1]}</div>
                <div class="entry">
                    <div class="title">{item[0]}</div>
                    <div class="content">{item[2]}</div>
                </div>

                </div>
            ))}

            </div>
        );
    }
}

export default JournalList;