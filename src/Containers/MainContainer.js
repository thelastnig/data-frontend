import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import MainPage from '../Pages/MainPage'

class MainContainer extends Component {
  render(){
    return (
      <Container>
        <MainPage/>
      </Container>
    )
  }
}

export default MainContainer

const Container = styled.div`
  width: 100%;
`