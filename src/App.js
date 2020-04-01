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

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Container>
          <ContentContainer>
            <div className='leftContent'>
              <div className='upperInfo'>
                <div className='upperInfoIcon'>
                  <img src={iconLogo} alt={iconLogo} height="30px"/>
                </div>
                <div className='upperInfoText'><span>Park</span> Jongwon</div>
              </div>
              <div className='lowerMenu'>
                <Link className='defaultLink' to='/'>
                  <div className='linkMenu'>
                    <div className='lowerMenuIcon'>
                      <img src={iconMain} alt={iconMain} height="20px"/>
                    </div>
                    <div className='lowerMenuText'>Dashboard</div>
                  </div>
                </Link>
                <Link className='defaultLink' to='/text'>
                  <div className='linkMenu'>
                    <div className='lowerMenuIcon'>
                      <img src={iconText} alt={iconText} height="20px"/>
                    </div>
                    <div className='lowerMenuText'>Text Mining</div>
                  </div>
                </Link>
                <Link className='defaultLink' to='/add'>
                  <div className='linkMenu'>
                    <div className='lowerMenuIcon'>
                      <img src={iconAdd} alt={iconAdd} height="20px"/>
                    </div>
                    <div className='lowerMenuText'>Additional</div>
                  </div>
                </Link>
              </div>
            </div>
            <div className='rightContent'>
              <div className="Wrapper">
                <Switch>
                  <Route exact path="/" component={MainContainer} />
                  <Route path="/text" component={TextContainer} />
                  <Route path="/add" component={AdditionalContainer} />
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
  width: 100%;
  padding: 30px 0;
  background-color: ${oc.gray[8]};
`;

const ContentContainer = styled.div`
  width: 1300px;
  margin: 0 auto;
  border-radius: 20px;

  display: flex;
  justify-conten: center;
  align-items: flex-start;

  .leftContent {
    width: 17%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    min-height: 700px;
    background: #333333;

    .defaultLink {
      color: black;
      text-decoration:none;
    }
  }

  .rightContent {
    width: 83%;
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

        &:hover {
          color: ${oc.grape[7]}
        }
      }
    }
  }
`


