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

import iconTest from '../image/home.png';

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
        <MenuItem className='menuItem' value={value} key={i}>{value}</MenuItem>
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
        <div className='upperInfoText'>
          서울 지역 아파트 가격 동향
        </div>
        <div className='upperInfoItemContainer'>
          <div className='upperInfoItem'>
            <div className='upperInfoUpper'>
              <div className='upperInfoUpperIcon'>
                <img src={iconTest} alt={iconTest} height="20px"/>
              </div>
              <div className='upperInfoUpperText'>매매가 최고 지역 <span>('20.3)</span></div>
            </div>
            <div className='upperInfoMiddle'>서초구</div>
            <div className='upperInfoLower'>1,770,507</div>
          </div>
          <div className='upperInfoItem second'>
            <div className='upperInfoUpper'>
              <div className='upperInfoUpperIcon second'>
                <img src={iconTest} alt={iconTest} height="20px"/>
              </div>
              <div className='upperInfoUpperText second'>전세가 최고 지역 <span>('20.3)</span></div>
            </div>
            <div className='upperInfoMiddle'>서초구</div>
            <div className='upperInfoLower'>864,651</div>
          </div>
          <div className='upperInfoItem third'>
            <div className='upperInfoUpper'>
              <div className='upperInfoUpperIcon third'>
                <img src={iconTest} alt={iconTest} height="20px"/>
              </div>
              <div className='upperInfoUpperText third'>매매가 최고 상승 지역 <span>('19.4~'20.3)</span></div>
            </div>
            <div className='upperInfoMiddle'>종로구</div>
            <div className='upperInfoLower'>44.3%</div>
          </div>
          <div className='upperInfoItem forth'>
            <div className='upperInfoUpper'>
              <div className='upperInfoUpperIcon forth'>
                <img src={iconTest} alt={iconTest} height="20px"/>
              </div>
              <div className='upperInfoUpperText forth'>전세가 최고 상승 지역 <span>('19.4~'20.3)</span></div>
            </div>
            <div className='upperInfoMiddle'>종로구</div>
            <div className='upperInfoLower'>45%</div>
          </div>
        </div>
        <div className='upper'>
          <div className='upperLeft'>
            <div className='commonText'>
              아파트 매매가 <span>('20.3) [단위: 천원]</span> 
            </div>
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
            <div className='commonText Float'>
              아파트 매매가 추이 <span>[단위: 천원]</span>
            </div>
            <HeatMap/>
          </div>
          <div className='middleRight'>
            <div className='commonText Float'>
              아파트 매매/전세/월세 상승률 <span>[단위: %]</span>
            </div>
            <Cluster/>
          </div>
        </div>
        <div className="middle2">
          
          <div className="upperInforArea">
            <div className='infoText'>
              구별 아파트 매매/전세가 <span>[단위: 천원]</span>
            </div>
            <Select  className='selectItem' value={selectedTime} onChange={(e)=>this.props.selectTime(e.target.value)}>
              {times}
            </Select>
          </div>
          <BarChart {...this.props}/>
        </div>
        <div className='tableContainer'>
          <div className='infoContainer'>
            <div className='infoText'>아파트 가격 도표 <span>[단위: 천원]</span></div>
            <div className='typeContainer'>
              <div className='type b' onClick={()=>this.props.selectType('매매')}>매매</div>
              <div className='type c' onClick={()=>this.props.selectType('전세')}>전세</div>
              <div className='type m' onClick={()=>this.props.selectType('월세')}>월세</div>
            </div>
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

  .commonText {
    height: 20px;
    font-size: 17px;
    color: ${oc.gray[2]};
    font-family: 'Noto Sans KR';

    margin-top: 15px;
    margin-left: 15px;

    &.Float {
      position: absolute;
      top: 15px;
      left: 15px;

      margin-top: 0;
      margin-left: 0;
      z-index: 99;
    }

    span {
      font-size: 12px;
    }
  }

  .upperInfoText {
    font-size: 22px;
    letter-spacing: 2px;
    color: white;
    font-family: 'Noto Sans KR';

    margin-bottom: 50px;
    margin-top: 15px;
  }

  .upperInfoItemContainer {
    width: 1185px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 30px;

    .upperInfoItem {
      width: 253.75px;
      padding: 10px;
      height: 90px;;
      border-radius: 10px;
      background-color: ${oc.grape[9]};

      &.second {
        background-color: ${oc.pink[9]}
      }
      &.third {
        background-color: ${oc.violet[9]}
      }
      &.forth {
        background-color: ${oc.blue[9]}
      }

      .upperInfoUpper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 5px;

        .upperInfoUpperIcon {
          margin-right: 7px;
          margin-left: 5px;
          font-size: 18px;
          color: white;
        }
        .upperInfoUpperText {
          font-size: 14px;
          letter-spacing: 1px;
          color: white;
          font-family: 'Noto Sans KR';
          color: white;

          span {
            font-size: 8px;
          }
        }

      }
      .upperInfoMiddle {
        font-size: 22px;
        letter-spacing: 2px;
        color: white;
        font-family: 'Noto Sans KR';
        text-align: center;
        margin-bottom: 5px;

      }
      .upperInfoLower {
        font-size: 16px;
        letter-spacing: 1px;
        color: white;
        text-align: center;
      }
    }
  }

  .upper {
    width: 1185px;
    display: flex;
    justify-content: center;
    align-items: center;

    .upperLeft {
      width: 720px;
      height: 670px;
      margin-right: 30px;
      border-radius: 10px;
      background: #333333;
    }
    .upperRight {
      width: 435px;

      .upperRightUp {
        width: 100%;
        height: 320px;
        margin-bottom: 30px;
        border-radius: 10px;
        background: #333333;
        text-align: center;
      }
      .upperRightDown {
        width: 100%;
        padding-top: 5px;
        height: 320px;
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
      position: relative;
    }
    .middleRight {
      width: 577.5px;
      height: 590px;
      padding-top: 10px;
      border-radius: 10px;
      background: #333333;
      position: relative;
    }
  }

  .middle2 {
    width: 1185px;
    height: 590px;
    margin-top: 30px;
    border-radius: 10px;
    background: #333333;

    .upperInforArea {
      width: 1125px;
      padding-top: 10px;
      margin-left: 15px;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      .infoText {
        margin-right: 20px;
        height: 20px;
        font-size: 17px;
        color: ${oc.gray[2]};
        font-family: 'Noto Sans KR';

        span {
          font-size: 12px;
        }
      }
      .selectItem {
        padding-top: 10px;
      }
      .menuItem {
        color: ${oc.gray[2]};
      }
    }
  }

  .tableContainer {
    width: 1185px;
    padding-bottom: 30px;
    margin-top: 30px;
    border-radius: 10px;
    background: #333333;

    .infoContainer {
      width: 1140px;
      padding-top: 15px;
      margin-left: 15px;
      margin-bottom: 20px;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .infoText {
      margin-right: 30px;
      height: 20px;
      font-size: 17px;
      color: ${oc.gray[2]};
      font-family: 'Noto Sans KR';

      span {
        font-size: 12px;
      }
    }

    .typeContainer {
      width: 240px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 5px;

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