import React, {Component} from 'react';
import styled from "styled-components";
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import timeSpan from '../data/timeSpan';

class Cluster extends Component {
  
  state = {
    layout: {
      autosize: true,
      height: 560,
      width: 560,
      scene: {
          aspectratio: {
              x: 1,
              y: 1,
              z: 1
          },
          camera: {
              center: {
                  x: 0,
                  y: 0,
                  z: 0
              },
              eye: {
                  x: 1.25,
                  y: 1.25,
                  z: 1.25
              },
              up: {
                  x: 0,
                  y: 0,
                  z: 1
              }
          },
          xaxis: {
              type: 'linear',
              zeroline: false
          },
          yaxis: {
              type: 'linear',
              zeroline: false
          },
          zaxis: {
              type: 'linear',
              zeroline: false
          }
      },
    }
  }

  componentDidMount() {
    // let zArray = [];
    // Object.values(data).map((prices, i) => {
    //   zArray.push(prices);
    // })
    this.setState({
      data: [
        {
          x: [1, 2, 5, 10, 18, 21, 25, 39, 25, 27],
          y: [-1, 7, 7, 15, 15, 12, 25, 25, 26, 39],
          z: [0, 5, 8, 8, 12, 20, 14, 41, 38, 41],
          mode: 'markers',
          type: 'scatter3d',
          marker: {
            color: '#5f3dc4',
            size: 3
          }
        }, {
          alphahull: 7,
          opacity: 0.1,
          type: 'mesh3d',
          x: [1, 2, 5, 10, 18, 21, 25, 39, 25, 27],
          y: [-1, 7, 7, 15, 15, 12, 25, 25, 26, 39],
          z: [0, 5, 8, 8, 12, 20, 14, 41, 38, 41],
      }]
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

export default Cluster;

const Container = styled.div`
`