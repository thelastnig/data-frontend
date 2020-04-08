import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import axios from 'axios';
import postscribe from 'postscribe';
import mapScript from '../Script/map';
import HeatMap from '../Graph/HeatMap'


class MainPage extends Component {  

  componentDidMount() {
    postscribe('#testDiv', mapScript);
  }

  getData = () => {
    const apiTarget = 'http://127.0.0.1:5000/process';
    axios.get(apiTarget)
    .then(response => {
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
    return (
      <Container>
        <div className='testDiv' id='testDiv'/>
        <HeatMap/>
      </Container>
    )
  }
}

export default MainPage

const Container = styled.div`
  width: 100%;

  .testDiv {
    width: 80%;
    border: 1px solid red;
  }
`