import React, {Component} from 'react';
import styled from "styled-components";
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import dataC from '../data/realEstateCharter';
import dataM from '../data/realEstateMonth';
import timeSpan from '../data/timeSpan';

class Cluster extends Component {
  
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
      scene: {
          bgcolor: '#333333',
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
              zeroline: false,
              gridcolor: '#74b816',
              gridwidth: 1.5,
              tickfont: {
                color: '#dee2e6'
              },
          },
          yaxis: {
              type: 'linear',
              zeroline: false,
              gridcolor: '#74b816',
              gridwidth: 1.5,
              tickfont: {
                color: '#dee2e6'
              },
          },
          zaxis: {
              type: 'linear',
              zeroline: false,
              gridcolor: '#74b816',
              gridwidth: 1.5,
              tickfont: {
                color: '#dee2e6'
              },
          }
      },
    }
  }
  
  StandardDeviation = (numbersArr) => {
    //--CALCULATE AVAREGE--
    let total = 0;
    for(let key in numbersArr) 
       total += numbersArr[key];
    let meanVal = total / numbersArr.length;
    //--CALCULATE AVAREGE--
  
    //--CALCULATE STANDARD DEVIATION--
    let SDprep = 0;
    for(let key in numbersArr) 
       SDprep += Math.pow((parseFloat(numbersArr[key]) - meanVal),2);
    let SDresult = Math.sqrt(SDprep/numbersArr.length);
    //--CALCULATE STANDARD DEVIATION--
    return SDresult;
  }
  
  getMean = (numbersArr) => {
    //--CALCULATE AVAREGE--
    let total = 0;
    for(let key in numbersArr) 
       total += numbersArr[key];

    return total / numbersArr.length;
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

    // const xMean = this.getMean(xArray);
    // const xSD = this.StandardDeviation(xArray);
    // const xArrayResult = xArray.map((value, i) => {
    //   return (value - xMean) / xSD;
    // })

    // const yMean = this.getMean(yArray);
    // const ySD = this.StandardDeviation(yArray);
    // const yArrayResult = yArray.map((value, i) => {
    //   return (value - yMean) / ySD;
    // })

    // const zMean = this.getMean(zArray);
    // const zSD = this.StandardDeviation(zArray);
    // const zArrayResult = zArray.map((value, i) => {
    //   return (value - zMean) / zSD;
    // })


    this.setState({
      data: [
        {
          x: xArray,
          y: yArray,
          z: zArray,
          mode: 'markers',
          type: 'scatter3d',
          marker: {
            color: '#5f3dc4',
            size: 3.5
          }
        }, {
          alphahull: 7,
          opacity: 0.2,
          color: '#fcc419',
          type: 'mesh3d',
          x: xArray,
          y: yArray,
          z: zArray,
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