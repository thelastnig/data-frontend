import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import MainPage from '../Pages/MainPage'

class MainContainer extends Component {
  state = {
    selectedArea: "종로구"
  }

  selectArea = (area) => {
    this.setState({
      selectedArea: area
    })
  }

  render(){
  const { selectedArea } = this.state;
  const selectArea = this.selectArea
    return (
      <Container>
        <MainPage selectedArea={selectedArea} selectArea={selectArea}/>
      </Container>
    )
  }
}

export default MainContainer

const Container = styled.div`
  width: 100%;
`