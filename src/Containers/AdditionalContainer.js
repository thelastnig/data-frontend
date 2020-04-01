import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import AdditionalPage from '../Pages/AdditionalPage'

class AdditionalContainer extends Component {
  render(){
    return (
      <Container>
        <AdditionalPage/>
      </Container>
    )
  }
}

export default AdditionalContainer

const Container = styled.div`
  width: 100%;
`