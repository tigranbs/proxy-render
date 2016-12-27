import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <h1>Test Component !! - {this.props.name}</h1>;
    }
}

export default (props) => {
    return <App {...props}/>
};