import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import oc from 'open-color';
import MainContainer from './Containers/MainContainer';
import TextContainer from './Containers/TextContainer';
import AdditionalContainer from './Containers/AdditionalContainer';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Container>
          <ContentContainer>
            <div className='leftContent'>
              <div className='upperInfo'>
                <div className='upperInfoIcon'></div>
                <div className='upperInfoText'>Park JW</div>
              </div>
              <div className='lowerMenu'>
                <Link className='defaultLink' to='/text'>
                  <div className='linkMenu'>
                    text
                  </div>
                </Link>
                <Link className='defaultLink' to='/add'>
                  <div className='linkMenu'>
                    add
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
    border: 1px solid white;

    display: flex;
    justify-content: center;
    align-items: center;

    .upperInfoIcon {

    }

    .upperInfoText {
      font-size: 20px;
      text-align: center;
    }
  }

  .lowerMenu {
    padding: 0 10px;
  }
`


