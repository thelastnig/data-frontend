import React, {Component, Fragment} from 'react';
import styled, { css, keyframes } from 'styled-components';
import Plot from 'react-plotly.js';
import data from '../data/realEstate';
import dataCharter from '../data/realEstateCharter';
import timeSpan from '../data/timeSpan'
import { thresholdScott } from 'd3';
import oc from 'open-color';

class LinearMap extends Component {
  
  state = {
    selectedArea: this.props.selectedArea,
    preArea: this.props.selectedArea,
    isNew: false,
    layout: {
      autosize: false,
      width: 420,
      height: 280,
      margin: {
        l: 70,
        r: 10,
        b: 40,
        t: 30,
        pad: 4,
      },
      xaxis: {
        color: '#dee2e6'
      },
      yaxis: {
        autorange: true,
        color: '#dee2e6', 
        tickformat: ',d',
        
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

    //   const transition = {
    //     duration: 2000,
    //     easing: 'elastic-in'
    //  }
      return {
        selectedArea: nextProps.selectedArea,
        preArea: prevState.selectedArea,
        isNew: !prevState.isNew,
        layout: {
          // transition: transition,
          // frame: {duration: 2000, redraw: false},
          autosize: false,
          width: 420,
          height: 280,
          margin: {
            l: 70,
            r: 10,
            b: 40,
            t: 30,
            pad: 4,
          },
          xaxis: {
            color: '#dee2e6'
          },
          yaxis: {
            autorange: true,
            color: '#dee2e6', 
            tickformat: ',d',
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
        },
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
    const { data, dataC, layout, isNew, preArea } = this.state;
    const { selectedArea } = this.props;
    const isAnew = selectedArea !== preArea ? true : false;
    return(
      <Container isNew={isNew} isAnew={isAnew}>
        <div className="divContainer">
          <div className='infoText'>
            {selectedArea} 매매/전세가 추이 <span>[단위: 천원]</span>
          </div>
          <Plot
            data={[data, dataC]} 
            layout={layout}
            graphDiv="graph"
          />
        </div>
      </Container>
    )
  }
}

export default LinearMap;

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

const Container = styled.div`
  @keyframes fadeIn {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }

  .divContainer {
    animation-duration: 2s;
    animation-name: fadeIn;
    
    ${props => {
      if(props.isNew) {
        return css`
          animation-name: ${fadeIn};
          animation-duration: 2s;
        `
      }
    }}
    
    ${props => {
      if(props.isNew === false) {
        return css`
          animation-name: ${fadeIn};
          animation-duration: 2s;
        `
      }
    }}
  }

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