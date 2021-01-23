import React from 'react';

import './styles.css';

class FillButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        };
    }

    clicked = () => {
        this.setState({clicked: !this.state.clicked});
    }
    
    render() {

        const style = {
            display: 'block',
            maxWidth: 300,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: this.state.clicked ? 'white' : '#16C79A',
            color: this.state.clicked ? '#16C79A' : 'white',
            textAlign: 'center',
            borderRadius: 100,
            marginLeft: 10,
            marginRight: 10,
        };

        return (
            <div style={style} onClick={this.clicked}>
                {this.props.text}
            </div>
        );
    }
}

export default FillButton;