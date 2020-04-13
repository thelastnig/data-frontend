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
import Mesh from '../Graph/Mesh';

import { Select, MenuItem  } from '@material-ui/core';
import data from '../data/realEstate';
import dataC from '../data/realEstateCharter';
import dataM from '../data/realEstateMonth';
import timeSpan from '../data/timeSpan';


class MainPage extends Component {
  
  state = {
    timeSpanReverse: [],
  }

  componentDidMount() {
    this.setState({
      selectedType: this.props.selectedType,
    })
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedType !== prevState.selectedType) {
      return {
        selectedType: nextProps.selectedType,
      }
    } 
    return null;
  }  

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    const { selectedType } = this.state;

    const times = timeSpan.date.map((value, i) => {
      return (
        <MenuItem value={value} key={i}>{value}</MenuItem>
      )
    })

    const tableTimes = timeSpan.date.map((value, i) => {
      return (
        <div className='timeItem' key={i}>{value}</div>
      )
    })

    const keyArray = Object.keys(data);

    let typeData = data;
    let isBSelected = true;
    let isCSelected = false;
    let isMSelected = false;

    if (selectedType === "매매") {
      typeData = data;
      isBSelected = true;
      isCSelected = false;
      isMSelected = false;
    } else if (selectedType === "전세") {
      typeData = dataC;
      isBSelected = false;
      isCSelected = true;
      isMSelected = false;
    } else if (selectedType === "월세") {
      typeData = dataM;
      isBSelected = false;
      isCSelected = false;
      isMSelected = true;
    }

    const valueArray = Object.values(typeData).map((values, i) => {
      const items = values.map((value, i) => {
        return (
          <div className='valueItem' key={i}>{this.numberWithCommas(value)}</div>
        )
      })

      return (
        <div className='valueContainer' key={i}>
          <div className='valueItem first'>{keyArray[i]}</div>
          {items}
        </div>
      )

    })
    return (
      <Container isBSelected={isBSelected} isCSelected={isCSelected} isMSelected={isMSelected} >
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
        <div className='tableContainer'>
          <div className='typeContainer'>
            <div className='type b' onClick={()=>this.props.selectType('매매')}>매매</div>
            <div className='type c' onClick={()=>this.props.selectType('전세')}>전세</div>
            <div className='type m' onClick={()=>this.props.selectType('월세')}>월세</div>
          </div>
          <div className='table'>
            <div className='timeContainer'>
              <div className='timeItem first'>지역</div>
              {tableTimes}
            </div>
            {valueArray}
          </div>
        </div>
        <Mesh/>
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

  .tableContainer {
    width: 1185px;
    padding-top: 30px;
    padding-bottom: 30px;
    margin-top: 30px;
    border-radius: 10px;
    background: #333333;

    .typeContainer {
      width: 240px;
      margin-left: 30px;
      margin-bottom: 20px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      .type {
        width: 80px;
        border-bottom: 3px solid ${oc.gray[6]};
        padding-bottom: 10px;
        cursor: pointer;
        font-family: 'Noto Sans KR';
        font-size: 14px;
        color: ${oc.gray[3]};
        letter-spacing: 1px;

        &.b {
          ${props => props.isBSelected && `
            border-bottom: 3px solid ${oc.violet[8]};
            color: ${oc.violet[4]};
          `}
        }
        &.c {
          ${props => props.isCSelected && `
            border-bottom: 3px solid ${oc.violet[8]};
            color: ${oc.violet[4]};
          `}
        }
        &.m {
          ${props => props.isMSelected && `
            border-bottom: 3px solid ${oc.violet[8]};
            color: ${oc.violet[4]};
          `}
        }
      }
    }

    .timeContainer {
      width: 1125px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 30px;
      color: ${oc.gray[3]};
      font-size: 12px;
      background-color: ${oc.violet[9]};
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;

      .timeItem {
        width: 88px;
        text-align: center;

        &.first {
          width: 81px;
          font-family: 'Noto Sans KR';
        }
      }
    }

    .valueContainer {
      width: 1125px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 30px;
      color: ${oc.gray[3]};
      font-size: 12px;
      height: 25px;
      border-bottom: 1px solid ${oc.gray[7]};

      .valueItem {
        width: 88px;
        text-align: center;

        &.first {
          width: 81px;
          font-family: 'Noto Sans KR';
        }
      }
  }
`