import React, {Component} from 'react';
import styled from "styled-components";
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import timeSpan from '../data/timeSpan'

class LinearMap extends Component {
  
  state = {
    layout: {
    }
  }

  componentDidMount() {
    let totalArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Object.values(data).map((prices, i) => {
      prices.map((price, i) => {
        totalArray[i] += price;
      });
    });

    const meanArray = totalArray.map((price, i) => {
      return parseInt(price / Object.keys(data).length);
    })

    this.setState({
      data: {
        x: timeSpan.date,
        y: Object.values(data)[0],
        type: 'scatter',
      },
      dataMean: {
        x: timeSpan.date,
        y: meanArray,
        type: 'scatter',
      }
    })
  }

  render() {
    const { data, dataMean, layout } = this.state;
    return(
      <Plot
        data={[data, dataMean]} 
        layout={layout}
        graphDiv="graph"
      />
    )
  }
}

export default LinearMap;

const Container = styled.div`
`