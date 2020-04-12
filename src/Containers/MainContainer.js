import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import MainPage from '../Pages/MainPage'

class MainContainer extends Component {
  state = {
    selectedArea: "종로구",
    selectedTime: '2020-03',
  }

  selectArea = (area) => {
    this.setState({
      selectedArea: area
    })
  }

  selectTime = (time) => {
    this.setState({
      selectedTime: time
    })
  }

  render(){
  const { selectedArea, selectedTime } = this.state;
  const selectArea = this.selectArea
  const selectTime = this.selectTime
    return (
      <Container>
        <MainPage 
          selectedArea={selectedArea} 
          selectArea={selectArea} 
          selectedTime={selectedTime} 
          selectTime={selectTime} />
      </Container>
    )
  }
}

export default MainContainer

const Container = styled.div`
  width: 100%;
`