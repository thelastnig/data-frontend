import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import axios from 'axios';
import postscribe from 'postscribe';
// import mapScript from '../Script/map';

import MapChart from './Map'
import HeatMap from '../Graph/HeatMap';
import LinearMap from '../Graph/Linear';
import Indicator from '../Graph/Indicator';
import BarChart from '../Graph/BarChart';
import Cluster from '../Graph/Cluster';

import { Select, MenuItem  } from '@material-ui/core';
import timeSpan from '../data/timeSpan'


class MainPage extends Component {
  
  state = {
    timeSpanReverse: []
  }

  componentDidMount() {
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
    const { selectedTime } = this.props;
    const times = timeSpan.date.map((value, i) => {
      return (
        <MenuItem value={value} key={i}>{value}</MenuItem>
      )
    })
    return (
      <Container>
        {/* <div className='testDiv' id='testDiv'/> */}
        <div className='upper'>
          <div className='upperLeft'>
            <MapChart {...this.props}/>
          </div>
          <div className='upperRight'>
            <div className="upperRightUp">
              <LinearMap {...this.props}/>
            </div>
            <div className="upperRightDown">
              <Indicator {...this.props}/>
            </div>
          </div>
        </div>
        <div className='middle'>
          <div className='middleLeft'>
            <HeatMap/>
          </div>
          <div className='middleRight'>
            <Cluster/>
          </div>
        </div>
        <div className="middle2">
          
          <div className="upperInforArea">
            <Select value={selectedTime} onChange={(e)=>this.props.selectTime(e.target.value)}>
              {times}
            </Select>

          </div>
          <BarChart {...this.props}/>
        </div>
      </Container>
    )
  }
}

export default MainPage

const Container = styled.div`
  width: 100%;
  padding: 30px;

  .testDiv {
    width: 80%;
    border: 1px solid red;
  }

  .upper {
    width: 1185px;
    display: flex;
    justify-content: center;
    align-items: center;

    .upperLeft {
      width: 720px;
      height: 600px;
      margin-right: 30px;
      border-radius: 10px;
      background: #333333;
    }
    .upperRight {
      width: 435px;

      .upperRightUp {
        width: 100%;
        height: 285px;
        margin-bottom: 30px;
        border-radius: 10px;
        background: #333333;
        text-align: center;
      }
      .upperRightDown {
        width: 100%;
        padding-top: 5px;
        height: 285px;
        border-radius: 10px;
        background: #333333;
        text-align: center;
      }
    }
  }

  .middle {
    width: 1185px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    text-align: center;

    .middleLeft {
      width: 577.5px;
      height: 590px;
      padding-top: 10px;
      margin-right: 30px;
      border-radius: 10px;
      background: #333333;
    }
    .middleRight {
      width: 577.5px;
      height: 590px;
      padding-top: 10px;
      border-radius: 10px;
      background: #333333;

    }
  }

  .middle2 {
    width: 1185px;
    height: 590px;
    margin-top: 30px;
    padding-top: 10px;
    border-radius: 10px;
    background: #333333;
  }
`