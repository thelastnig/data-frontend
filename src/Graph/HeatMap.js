import React, {Component} from 'react';
import styled from "styled-components";
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import timeSpan from '../data/timeSpan';

class HeatMap extends Component {
  
  state = {
    layout: {
      autosize: false,
      width: 570,
      height: 570,
      margin: {
        l: 70,
        r: 50,
        b: 50,
        t: 70,
      },
      paper_bgcolor: '#333333',
      plot_bgcolor: '#333333',
      xaxis: {
        weight: 600,
        tickfont: {
          size: 11,
          color: '#dee2e6',
          weight: 600,
        },
      },
      yaxis: {
        autotick: false,
        tickfont: {
          size: 10,
          weight: 400,
          color: '#dee2e6',
          family: 'Noto Sans KR',
        },
      },
    }
  }

  componentDidMount() {
    let zArray = [];
    Object.values(data).map((prices, i) => {
      zArray.push(prices);
    })
    this.setState({
      data: {
        showscale: true,
        colorbar: {
          tickfont: {
            color: 'dee2e6'
          }
        },
        x: timeSpan.date,
        y: Object.keys(data),
        z: zArray,
        type: 'heatmap',
        hoverongaps: false,
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