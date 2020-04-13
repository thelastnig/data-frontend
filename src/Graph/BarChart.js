import React, {Component} from 'react';
import styled from "styled-components";
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import dataCharter from '../data/realEstateCharter';
import timeSpan from '../data/timeSpan'
class BarChart extends Component {
  
  state = {
    selectedTime: this.props.selectedTime,
    layout: {
      autosize: false,
      width: 1170,
      height: 580,
      margin: {
        l: 65,
        r: 30,
        b: 50,
        t: 50,
        pad: 4,
      },
      xaxis: {
        tickfont: {
          family: 'Noto Sans KR',
          size: 10.5,
          color: '#dee2e6'
        },
      },
      yaxis: {
        autorange: true,
        color: '#868e96',
        tickfont: {
          color: '#dee2e6'
        },
      }, 
      paper_bgcolor: '#333333',
      plot_bgcolor: '#333333',
      showlegend: true,
      legend: {
        x: 0,
        y: 1.0,
        font: {
          size: 12,
          color: '#dee2e6',
          family: 'Noto Sans KR',
        },
        bgcolor: '#333333',
      }
    }
  }

  componentDidMount() {

    const keyNames = Object.keys(data);

    let index = 11
    timeSpan.date.forEach((value, i) => {
      if (value === this.props.selectedTime) {
        index = i
      }
    })

    let valueArray = []
    Object.values(data).map(value => {
      valueArray.push(value[index]);
    })

    let valueCArray = []
    Object.values(dataCharter).map(value => {
      valueCArray.push(value[index]);
    })

    this.setState({
      data: {
        x: keyNames,
        y: valueArray,
        name: "매매가",
        // fill: 'tozeroy',
        // fillcolor: '#5f3dc4',
        // type: 'scatter',
        // mode: 'none',
        type: 'bar',
        marker: {
          color: '#5f3dc4',
        }
      },
      dataC: {
        x: keyNames,
        y: valueCArray,
        name: "전세가",
        // fill: 'tozeroy',
        // fillcolor: '#b197fc',
        // type: 'scatter',
        // mode: 'none'
        type: 'bar',
        marker: {
          color: '#868e96',
        }
      },
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedTime !== prevState.selectedTime) {
      
      const keyNames = Object.keys(data);

      let index = 11
      timeSpan.date.forEach((value, i) => {
        if (value === nextProps.selectedTime) {
          index = i
        }
      })
  
      let valueArray = []
      Object.values(data).map(value => {
        valueArray.push(value[index]);
      })
  
      let valueCArray = []
      Object.values(dataCharter).map(value => {
        valueCArray.push(value[index]);
      })

      return {
        selectedTime: nextProps.selectedTime,
        data: {
          x: keyNames,
          y: valueArray,
          type: 'bar',
          name: "매매가",
          marker: {
            color: '#5f3dc4',
          }
        },
        dataC: {
          x: keyNames,
          y: valueCArray,
          type: 'bar',
          name: "전세가",
          marker: {
            color: '#868e96',
          }
        }
      }
    }
    return null
  }

  render() {
    const { data, dataC, layout } = this.state;
    const { selectedArea } = this.props;
    return(
      <Plot
        data={[data, dataC]} 
        layout={layout}
        graphDiv="graph"
      />
    )
  }
}

export default BarChart;

const Container = styled.div`
`