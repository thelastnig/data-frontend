import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import TextPage from '../Pages/TextPage'

class TextContainer extends Component {
  render(){
    return (
      <Container>
        <TextPage/>
      </Container>
    )
  }
}

export default TextContainer

const Container = styled.div`
  width: 100%;
`