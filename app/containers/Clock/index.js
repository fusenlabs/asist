import React, { Component } from 'react';

class AnimatedNumber extends Component {
  constructor(props) {
    super(props);
    this._stopAnimation = this._stopAnimation.bind(this);
    this.state = {
      animate: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        animate: true,
      });
      setTimeout(this._stopAnimation, 2000);
    }
  }

  render() {
    const animClassName = this.state.animate ? 'flipInX' : '';
    return (
      <span className={ `animated ${animClassName}` }>
        {this.props.value}
      </span>
    );
  }

  _stopAnimation() {
    this.setState({
      animate: false,
    });
  }
}

class Clock extends Component {
  constructor(props) {
    super(props);
    this._setTime = this._setTime.bind(this);

    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentWillMount() {
    this._setTime();
  }

  componentDidMount() {
    setInterval(this._setTime, 1000);
  }

  render() {
    const AnimatedSeconds = ({ value }) => {
      return (
        <span className="animated flipInX">
          {value}
        </span>
      );
    };
    const AnimatedSeparator = ({ value, secs }) => {
      const separator = value || ':';
      const animClassName = secs % 2 === 0
        ? 'fadeOut'
        : 'fadeIn';
      return (
        <span className={ `animated ${animClassName}` }>
          {separator}
        </span>
      );
    };
    const className = this.props.className
      ? `${this.props.className} level`
      : 'level';
    return (
      <div className={ className }>
        <div className="level-item has-text-centered">
          <AnimatedNumber value={ this.state.hours } />
          <AnimatedSeparator secs={ this.state.seconds } />
          <AnimatedNumber value={ this.state.minutes } />

        </div>
      </div>
    );
  }

  _twoDigits(n) {
    return n <= 9 ? `0${n}` : n;
  }

  _setTime() {
    const currentdate = new Date();
    let hours = currentdate.getHours();

    // correct for number over 24, and negatives
    if (hours >= 24) {
      hours -= 24;
    }
    if (hours < 0) {
      hours += 12;
    }

    // minutes are the same on every time zone
    let minutes = currentdate.getUTCMinutes();
    let seconds = currentdate.getUTCSeconds();

    this.setState({
      hours: this._twoDigits(hours),
      minutes: this._twoDigits(minutes),
      seconds: this._twoDigits(seconds),
    });
  }
}

export default Clock;
