import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {

  constructor () {
    super();
  }

  state = {
    counter: 0
  }

  componentDidMount () {
    this._interval = setInterval(() => {
      this.iterate();
    }, 10);
  }

  componentWillUnmount () {
    clearInterval(this._interval);
  }

  iterate = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render () {
    return (<div>
      { this.state.counter }
      <Link to="/secondary">Secondary Page</Link>
    </div>);
  }

}

export default Home;
