import React, {Component} from 'react';
import styled from "styled-components";
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import timeSpan from '../data/timeSpan';
import oc from 'open-color';

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

      if (rate > 0) {
        return {
          selectedArea: nextProps.selectedArea,
          data: [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: rate,
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
      } else {
        return {
          selectedArea: nextProps.selectedArea,
          data: [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: rate,
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [0, -50] },
                bar: { color: "#c2255c" },
                bgcolor: "#333333",
                borderwidth: 2,
                bordercolor: "#868e96",
              }
            }
          ]
        }

      }
    }
    return null
  }

  render() {
    const { data, layout, selectedArea } = this.state;
    return(
      <Container>
        <div className='infoText'>
          {selectedArea} 매매가 상승률 <span>('19.4~'20.3) [단위: %]</span>
        </div>
        <Plot
          data={data} 
          layout={layout}
          graphDiv="graph"
        />
      </Container>
    )
  }
}

export default Indicator;

const Container = styled.div`

  .infoText {
    width: 100%;
    text-align:left;
    padding-left: 15px;
    padding-top: 15px;
    font-size: 17px;
    color: ${oc.gray[2]};
    font-family: 'Noto Sans KR';

    span {
      font-size: 12px;
    }
  }
`