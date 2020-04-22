import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import oc from 'open-color';
import MainContainer from './Containers/MainContainer';
import TextContainer from './Containers/TextContainer';
import AdditionalContainer from './Containers/AdditionalContainer';

import iconLogo from './image/cube.png' 
import iconMain from './image/report.png'
import iconText from './image/document.png'
import iconAdd from './image/dashboard.png'
import upload from './image/upload.png'

class App extends Component {
  state = {
    isDash: true,
    isText: false,
  }

  onClick = (type) => {
    if (type === 'dash') {
      this.setState({
        isDash: true,
        isText: false,
      })
    } else {
      this.setState({
        isDash: false,
        isText: true,
      })
    }
  }

  upload = () => {
    window.scrollTo(0, 0);
  }

  render() {
    const { isDash, isText } = this.state;
    return (
      <BrowserRouter basename='/data-frontend'>
        <Container>
          <ContentContainer isDash={isDash} isText={isText}>
            <div className='leftContent'>
              <div className='fixed'>
                <div className='upload'>
                  <div className='tooltip'>
                    맨 위로
                  </div>
                  <div className='triangle'></div>
                  <img className='upImg' src={upload} alt={upload} height="50px" onClick={this.upload}/>
                </div>
              </div>
              <div className='upperInfo'>
                <div className='upperInfoIcon'>
                  <img src={iconLogo} alt={iconLogo} height="30px"/>
                </div>
                <div className='upperInfoText'><span>Park</span> Jongwon</div>
              </div>
              <div className='lowerMenu'>
                <Link className='defaultLink' to='/' onClick={()=>this.onClick('dash')}>
                  <div className='linkMenu'>
                    <div className='lowerMenuIcon'>
                      <img src={iconMain} alt={iconMain} height="20px"/>
                    </div>
                    <div className='lowerMenuText' >Dashboard</div>
                  </div>
                </Link>
                <Link className='defaultLink' to='/text' onClick={()=>this.onClick('text')}>
                  <div className='linkMenu'>
                    <div className='lowerMenuIcon'>
                      <img src={iconText} alt={iconText} height="20px"/>
                    </div>
                    <div className='lowerMenuTextText'>Text Mining</div>
                  </div>
                </Link>
              </div>
            </div>
            <div className='rightContent'>
              <div className="Wrapper">
                <Switch>
                  <Route exact path="/" component={MainContainer} />
                  <Route path="/text" component={TextContainer} />
                  <Route path="/etc" component={AdditionalContainer} />
                </Switch>
              </div>
            </div>
          </ContentContainer>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;

const Container = styled.div`
  min-width: 1800px;
  padding: 30px 0;
  background-color: ${oc.gray[8]};
`;

const ContentContainer = styled.div`
  width: 1500px;
  margin: 0 auto;
  border-radius: 20px;

  display: flex;
  justify-conten: center;
  align-items: stretch;

  .leftContent {
    width: 255px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    min-height: 700px;
    background: #333333;

    .defaultLink {
      color: black;
      text-decoration:none;
    }

    .fixed {
      width: 100px;
      height: 100px;
      background: white;
      position: fixed;
      left: 30px;
      bottom: 30px;
      text-align: center;
      background: transparent;

      .upload {
        width: 100%;
        position: relative;
        text-align: center;
        background: transparent;
        
        .upImg {
          cursor: pointer;
        }

        .tooltip {
          width: 60px;
          text-align: center;
          background: black;
          opacity: 0.8;
          color: ${oc.gray[2]};
          padding: 5px;
          font-family: 'Noto Sans KR';
          font-size: 12px;
          border-radius: 5px;
          position: absolute;
          top: -50px;
          left: 14px;
        }
        .triangle {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 15px 7.5px 0 7.5px;
          border-color: black transparent transparent transparent;
          opacity: 0.8;
          position: absolute;
          top: -22px;
          left: 43px;
        }
      }
    }
  }

  .rightContent {
    width: 1245px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    min-height: 700px;
    background: #1E1E1E;
  }

  .upperInfo {
    width: 100%;
    height: 120px;

    display: flex;
    justify-content: center;
    align-items: center;

    .upperInfoIcon {

    }

    .upperInfoText {
      margin-left: 10px;
      font-size: 22px;
      text-align: center;
      color: white;

      span {
        color: ${oc.grape[8]}
      }
    }
  }

  .lowerMenu {
    
    .linkMenu {
      width: 100%;
      height: 50px;

      display: flex;
      justify-content: center;
      align-items: center;
      
      color: white;

      .lowerMenuIcon {
        padding-top: 3px;
      }

      .lowerMenuText {
        width: 100px;
        margin-left: 10px;
        color: white;

        ${props => props.isDash && `
          color: ${oc.grape[7]};
        `}

        ${props => !props.isDash && `
          color: white;
        `}

        &:hover {
          color: ${oc.pink[7]};
        }
      }

      .lowerMenuTextText {
        width: 100px;
        margin-left: 10px;
        color: white;

        ${props => props.isText && `
          color: ${oc.grape[7]};
        `}

        ${props => !props.isText && `
          color: white;
        `}

        &:hover {
          color: ${oc.pink[7]};
        }
      }
    }
  }
`


