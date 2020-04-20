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
        <div className='upperInfoTextLeft'>
          텍스트 마이닝
        </div>
        <div className='upperInfoTextRight'>
          소스 : 오즈의 마법사(The Wizard of Oz) 영어 원본
        </div>
      </div>
      <div className='upperContainer'>
        <div className='commonText'>
          등장인물 관계도
        </div>
        <div id='network' className='network'>
          <img src={network} alt={network} height="600px" />
        </div>
      </div>
      <div className='middleContainer'>
        <div className='commonText'>
          등장인물 동시출현 빈도
        </div>
        <div id='cast' className='cast'>
          <img src={cast} alt={cast} height="600px" />
        </div>
      </div>
      <div className='lowerContainer'>
        <div className='commonText'>
          챕터별 등장인물 출현 빈도
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
  padding-bottom: 100px;

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
    width: 1185px;
    margin-bottom: 50px;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .upperInfoTextLeft {
      width: 400px;
      font-size: 22px;
      margin-right: 305px;
      letter-spacing: 2px;
      color: white;
      font-family: 'Noto Sans KR';

    }
    .upperInfoTextRight {
      width: 480px;
      font-size: 14px;
      color: white;
      font-family: 'Noto Sans KR';
      text-align: right;
    }
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