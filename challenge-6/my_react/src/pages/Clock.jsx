import React from 'react'

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  // Metode componentDidMount() dijalankan setelah keluaran komponen telah dirender ke DOM. 
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // Hapus interval timer supaya tidak stuck
  componentWillUnmount() {
    clearInterval(this.timerID);    
  }

  // Fungsi supaya komponen clock dapat berjalan setiap detiknya
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1 className='font-bold'>Clock Timer</h1>
        <h2 className='text-lg'>It is {this.state.date.toLocaleTimeString()} in Jakarta.</h2>
      </div>
    );
  }
}

export default Clock