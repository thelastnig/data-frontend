import React, {Component} from 'react';
import styled from "styled-components";
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import timeSpan from '../data/timeSpan'

class Indicator extends Component {
  
  state = {
    selectedArea: this.props.selectedArea,
    layout: {
      autosize: false,
      width: 420,
      height: 270,
      margin: {
        l: 40,
        r: 40,
        b: 30,
        t: 50,
      },
      paper_bgcolor: '#333333',
      font: { 
        color: "#dee2e6",
      },
    },
  }

  componentDidMount() {
    const selectedData = data[this.props.selectedArea];
    const rate = (selectedData[selectedData.length - 1] - selectedData[0]) / selectedData[0] * 100;

    this.setState({
      data: [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: rate,
          title: { 
            text: "매매가 상승률 (%)",
            font: { size: 16 }
          },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 50] },
            bar: { color: "#3b5bdb" },
            bgcolor: "#333333",
            borderwidth: 2,
            bordercolor: "#868e96",
          }
        }
      ]
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedArea !== prevState.selectedArea) {
      const selectedData = data[nextProps.selectedArea];
      const rate = (selectedData[selectedData.length - 1] - selectedData[0]) / selectedData[0] * 100;
      return {
        selectedArea: nextProps.selectedArea,
        data: [
          {
            domain: { x: [0, 1], y: [0, 1] },
            value: rate,
            title: { 
              text: "매매가 상승률 (%)",
              font: { size: 16 }
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
              axis: { range: [null, 50] },
              bar: { color: "#3b5bdb" },
              bgcolor: "#333333",
              borderwidth: 2,
              bordercolor: "#868e96",
            }
          }
        ]
      }
    }
    return null
  }

  render() {
    const { data, layout } = this.state;
    return(
      <Plot
        data={data} 
        layout={layout}
        graphDiv="graph"
      />
    )
  }
}

export default Indicator;

const Container = styled.div`
`