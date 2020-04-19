import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import postscribe from 'postscribe';

import network from '../image/network.png';
import cast from '../image/cast.png';
import chapter from '../image/chapter.png';

class TextPage extends Component {

  componentDidMount() {
  }
  
  render(){
    return (
      <Container>
      <div className='upperInfoText'>
        서울 지역 아파트 가격 동향
      </div>
      <div className='upperContainer'>
        <div className='commonText'>
          아파트 매매가 <span>('20.3) [단위: 천원]</span> 
        </div>
        <div id='network' className='network'>
          <img src={network} alt={network} height="600px" />
        </div>
      </div>
      <div className='middleContainer'>
        <div className='commonText'>
          아파트 매매가 <span>('20.3) [단위: 천원]</span> 
        </div>
        <div id='cast' className='cast'>
          <img src={cast} alt={cast} height="600px" />
        </div>
      </div>
      <div className='lowerContainer'>
        <div className='commonText'>
          아파트 매매가 <span>('20.3) [단위: 천원]</span> 
        </div>
        <div id='chapter' className='chapter'>
          <img src={chapter} alt={cast} height="600px" />
        </div>
      </div>
      </Container>
    )
  }
}

export default TextPage

const Container = styled.div`
  width: 100%;
  padding: 30px;

  .commonText {
    height: 20px;
    font-size: 17px;
    color: ${oc.gray[2]};
    font-family: 'Noto Sans KR';

    position: absolute;
    top: 15px;
    left: 15px;

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

  .upperContainer {
    width: 1185px;
    height: 630px;
    margin-top: 30px;
    border-radius: 10px;
    background: #333333;
    position: relative;
    text-align: center;

    .network {
      text-align: center;
      padding-top: 25px;
    }
  }

  .middleContainer {
    width: 1185px;
    height: 650px;
    margin-top: 30px;
    border-radius: 10px;
    border: 1px solid #333333;
    background: #333333;
    position: relative;
    text-align: center;

    .cast {
      text-align: center;
      margin-top: 48px;
    }
  }

  .lowerContainer {
    width: 1185px;
    height: 690px;
    margin-top: 30px;
    border-radius: 10px;
    border: 1px solid #333333;
    background: #333333;
    position: relative;
    text-align: center;

    .chapter {
      text-align: center;
      margin-top: 40px;
    }
  }
`