import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <h1>Test Component, with some change !! - {this.props.name}</h1>;
    }
}

export default (props) => {
    return <App {...props}/>
};