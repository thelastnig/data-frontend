import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import MainPage from '../Pages/MainPage'

class MainContainer extends Component {
  state = {
    selectedArea: "종로구",
    selectedTime: '2020-03',
    selectedType: '매매',
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

  selectType = (type) => {
    console.log(type)
    this.setState({
      selectedType: type
    })
  }

  render(){
  const { selectedArea, selectedTime, selectedType } = this.state;
  const selectArea = this.selectArea
  const selectTime = this.selectTime
  const selectType = this.selectType
    return (
      <Container>
        <MainPage 
          selectedArea={selectedArea} 
          selectArea={selectArea} 
          selectedTime={selectedTime} 
          selectTime={selectTime} 
          selectedType={selectedType} 
          selectType={selectType}  />
      </Container>
    )
  }
}

export default MainContainer

const Container = styled.div`
  width: 100%;
`