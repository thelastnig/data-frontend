import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import axios from 'axios';
import postscribe from 'postscribe';

class MainPage extends Component {  
  
  state = {
    result: null,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const apiTarget = 'http://127.0.0.1:5000/process';
    axios.get(apiTarget)
    .then(response => {
      // console.log(response.data.split('</div>')[1])
      this.setState({
        result: response.data
      });
      postscribe('#testDiv', response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }


  render(){
    const { result } = this.state;
    const temp = {__html: result};
    return (
      <Container>
        <div className='testDiv' id='testDiv'/>
      </Container>
    )
  }
}

export default MainPage

const Container = styled.div`
  width: 100%;

  .testDiv {
    border: 1px solid red;
  }
`