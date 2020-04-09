import React, {Component} from 'react';
import styled from "styled-components";
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import timeSpan from '../data/timeSpan'

class Indicator extends Component {
  
  state = {
    layout: {
    },
  }

  componentDidMount() {
    const selectedData = Object.values(data)[0];
    const rate = (selectedData[selectedData.length - 1] - selectedData[0]) / selectedData[0] * 100;

    this.setState({
      data: [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: rate,
          title: { text: "Speed" },
          type: "indicator",
          mode: "gauge+number",
          // delta: { reference: 400 },
          gauge: { axis: { range: [null, 100] } }
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

export default Indicator;

const Container = styled.div`
`