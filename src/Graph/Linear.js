import React, {Component} from 'react';
import styled from "styled-components";
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import dataCharter from '../data/realEstateCharter';
import timeSpan from '../data/timeSpan'
import { thresholdScott } from 'd3';

class LinearMap extends Component {
  
  state = {
    selectedArea: this.props.selectedArea,
    layout: {
      autosize: false,
      width: 420,
      height: 280,
      margin: {
        l: 55,
        r: 20,
        b: 40,
        t: 30,
        pad: 4,
      },
      xaxis: {
        color: '#dee2e6'
      },
      yaxis: {
        autorange: true,
        color: '#dee2e6'
        
      }, 
      paper_bgcolor: '#333333',
      plot_bgcolor: '#333333',
      showlegend: true,
      legend: {
        orientation: "h",
        font: {
          size: 10,
          color: '#dee2e6'
        },
        bgcolor: '#333333',
      }
    }
  }

  componentDidMount() {
    // let totalArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // Object.values(data).map((prices, i) => {
    //   prices.map((price, i) => {
    //     totalArray[i] += price;
    //   });
    // });

    // const meanArray = totalArray.map((price, i) => {
    //   return parseInt(price / Object.keys(data).length);
    // })
    
    const valueArray = data[this.props.selectedArea];
    const valueCArray = dataCharter[this.props.selectedArea];

    const maxY = Math.max.apply(null, valueArray);
    const minY = Math.min.apply(null, valueCArray);

    this.setState({
      data: {
        x: timeSpan.date,
        y: valueArray,
        type: 'scatter',
        name: "매매가",
        mode: 'lines',
        line: {
          color: '#6741d9',
          width: 3
        }
      },
      dataC: {
        x: timeSpan.date,
        y: valueCArray,
        type: 'scatter',
        name: "전세가",
        mode: 'lines',
        line: {
          color: '#c2255c',
          width: 3
        }
      },
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedArea !== prevState.selectedArea) {
      return {
        selectedArea: nextProps.selectedArea,
        data: {
          x: timeSpan.date,
          y: data[nextProps.selectedArea],
          type: 'scatter',
          name: "매매가",
          mode: 'lines',
          line: {
            color: '#6741d9',
            width: 3
          }
        },
        dataC: {
          x: timeSpan.date,
          y: dataCharter[nextProps.selectedArea],
          type: 'scatter',
          name: "전세가",
          mode: 'lines',
          line: {
            color: '#c2255c',
            width: 3
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

export default LinearMap;

const Container = styled.div`
`