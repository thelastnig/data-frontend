import React, {Component} from 'react';
import styled from "styled-components";
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import timeSpan from '../data/timeSpan'

class HeatMap extends Component {
  
  state = {
    layout: {
      autosize: false,
      width: 600,
      height: 600,
      xaxis: {
        weight: 600,
        tickfont: {
          size: 10,
          color: '#343a40',
          weight: 600,
        },
      },
      yaxis: {
        autotick: false,
        tickfont: {
          size: 10,
          color: '#343a40',
          weight: 600,
          family: 'Noto Sans KR',
        },
      }
    }
  }

  componentDidMount() {
    let zArray = [];
    Object.values(data).map((prices, i) => {
      zArray.push(prices);
    })
    this.setState({
      data: {
        x: timeSpan.date,
        y: Object.keys(data),
        z: zArray,
        type: 'heatmap',
        hoverongaps: true,
        colorscale: 'Viridis',
        reversescale: true,
        ygap: 1,
        xgap: 1
      },
    })
  }

  render() {
    const { data, layout } = this.state;
    return(
      <Plot
        data={[data]} 
        layout={layout}
        graphDiv="graph"
      />
    )
  }
}

export default HeatMap;

const Container = styled.div`
`