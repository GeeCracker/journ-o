import React from 'react';

import './styles.css';

class FillButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: this.props.picked == 1,
        };
    }
    
    render() {

        const style = {
            display: 'inline-block',
            maxWidth: 300,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: this.props.active == 1 ? 'white' : '#16C79A',
            color: this.props.active == 1 ? '#16C79A' : 'white',
            textAlign: 'center',
            borderRadius: 100,
            marginLeft: 10,
            marginRight: 10,
        };

        return (
            <div style={style} onClick={() => this.props.handleClick(this.props.index)}>
                {this.props.text}
            </div>
        );
    }
}

export default FillButton;