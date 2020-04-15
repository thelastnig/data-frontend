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
      height: 520,
      margin: {
        l: 80,
        r: 30,
        b: 40,
        t: 20,
      },
      xaxis: {
        tickfont: {
          family: 'Noto Sans KR',
          size: 10.5,
          color: '#dee2e6'
        },
      },
      yaxis: {
        autorange: false,
        color: '#868e96',
        tickfont: {
          color: '#dee2e6'
        },
        tickformat: ',d',
        range: [0, 1800000],
      }, 
      yaxis2: {
        autorange: false,
        color: '#868e96',
        tickfont: {
          color: '#dee2e6'
        },
        overlaying: 'y',
        side: 'right',
        range: [0, 0.9],
        dtick: 0.1,
        tickformat: '%',
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

    let valueRatio = []
    valueArray.map((value, i) => {
      const ratio = (valueCArray[i] / value).toFixed(3); 
      valueRatio.push(parseFloat(ratio));
    })

    this.setState({
      data: {
        x: keyNames,
        y: valueArray,
        name: "매매가",
        type: 'bar',
        marker: {
          color: '#5f3dc4',
        }
      },
      dataC: {
        x: keyNames,
        y: valueCArray,
        name: "전세가",
        type: 'bar',
        marker: {
          color: '#adb5bd',
        }
      },
      dataR: {
        x: keyNames,
        y: valueRatio,
        name: "매매 대비 전세가율",
        type: 'scatter',
        line: {
          color: '#c2255c',
          width: 3
        },
        marker: {
          size: 8
        },
        yaxis: 'y2',
        mode: 'lines+markers',
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
      });
  
      let valueArray = []
      Object.values(data).map(value => {
        valueArray.push(value[index]);
      });
  
      let valueCArray = []
      Object.values(dataCharter).map(value => {
        valueCArray.push(value[index]);
      });

      let valueRatio = []
      valueArray.map((value, i) => {
        const ratio = (valueCArray[i] / value).toFixed(3); 
        valueRatio.push(parseFloat(ratio));
      });

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
            color: '#adb5bd',
          }
        },
        dataR: {
          x: keyNames,
          y: valueRatio,
          name: "매매 대비 전세가율",
          type: 'scatter',
          line: {
            color: '#c2255c',
            width: 3
          },
          yaxis: 'y2',
          mode: 'lines+markers',
        },
      }
    }
    return null
  }

  render() {
    const { data, dataC, dataR, layout } = this.state;
    const { selectedArea } = this.props;
    return(
      <Plot
        data={[data, dataC, dataR]} 
        layout={layout}
        graphDiv="graph"
      />
    )
  }
}

export default BarChart;

const Container = styled.div`
`