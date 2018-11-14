import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Vibration } from 'react-native';

export default class App extends React.Component{
  constructor() {
    super()
    this.state = {
      runTimer: false,
      seconds: 0,
      minutes: 2,
      isWorkTime: true,
    }
  };

  componentDidMount() {
    this.interval = setInterval(this.decrement, 10)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  decrement = () => {
    if(this.state.runTimer){

      if (this.state.seconds === 0) {
        this.setState (prevState => ({
          seconds: 59,
          minutes: prevState.minutes - 1,
        }))
      }
      else {
        this.setState (prevState => ({
          seconds: prevState.seconds - 1,
          minutes: prevState.minutes,
        }))
      }
      if (this.state.minutes === 0 && this.state.seconds===0){
        this.runAlert()        
      }     
    }
  }

  runAlert = () => {
    Vibration.vibrate([500, 500, 500])
    this.changeMode()
  }

  changeMode = () =>{
      this.setState(prevState=> ({
        runTimer: false,
        isWorkTime: !prevState.isWorkTime,
        seconds: 0,
      }))
      if (!this.state.isWorkTime){
        this.setState(prevState => ({
          minutes: 5,
        }))
      }
      else{
        this.setState(prevState => ({
          minutes: 25,          
        }))
      }
  
      }
  


  toggleCounter = () => 
    this.setState (prevState => ({
    runTimer: !prevState.runTimer,
  }))

  resetCounter = () =>
  this.setState({
    runTimer: false,
    seconds: 0,
    minutes: 25,
  })

  render(){
    return (
      <View style={styles.container}>
        <Text>POMODORO!</Text>
          <View>
            <Text>{ String(this.state.minutes).padStart(2,'0') }:{ String(this.state.seconds).padStart(2,'0') }</Text>
          </View>
        <Button title="Start/Stop" onPress={this.toggleCounter}/>
        <Button title="Reset" onPress={this.resetCounter}/>

      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
