import React from 'react';

import './styles.css';

import { Link } from 'react-router-dom';

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    signOut = () => {
        alert("sign out button");
    }
    
    render() {
        return (
            <div class="topbar">
                <div class="topbar-title">journ-o</div>
                <div class="outline-button">sign out</div>
            </div>
        );
    }
}

export default Topbar;