import React, {Component} from 'react';
import styled from "styled-components";
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import dataC from '../data/realEstateCharter';
import dataM from '../data/realEstateMonth';
import timeSpan from '../data/timeSpan';

class Mesh extends Component {
  
  state = {
    layout: {
      autosize: true,
      height: 560,
      width: 560,
      margin: {
        l: 50,
        r: 50,
        b: 70,
        t: 30,
      },
      paper_bgcolor: '#333333',
    }
  }

  componentDidMount() {
    let xArray = [];
    Object.values(data).map((prices, i) => {
      xArray.push((prices[prices.length - 1] - prices[0]) / prices[0] * 100);
    })
    let yArray = [];
    Object.values(dataC).map((prices, i) => {
      yArray.push((prices[prices.length - 1] - prices[0]) / prices[0] * 100);
    })
    let zArray = [];
    Object.values(dataM).map((prices, i) => {
      zArray.push((prices[prices.length - 1] - prices[0]) / prices[0] * 100);
    })
    this.setState({
      data: [
        {
          alphahull:5,
          opacity:0.8,
          color:'rgb(200,100,300)',
          type: 'mesh3d',
          x: xArray,
          y: yArray,
          z: zArray,
        }
      ]
    })
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

export default Mesh;

const Container = styled.div`
`