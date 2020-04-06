import React, {Component} from 'react';
import * as d3 from "d3";
import styled from "styled-components";

class MapChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart = () => {    
    const width = 800;
    const height = 600;

    const svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height);
    const map = svg.append("g").attr("id", "map");

    const projection = d3.geo.mercator()
    .center([126.9895, 37.5651])
    .scale(100000)
    .translate([width/2, height/2]);
   
    const path = d3.geo.path().projection(projection);

    const sequentialScale = d3.scaleSequential()
	  .domain([0, 100])
    .interpolator(d3.interpolateRainbow);
    
    d3.json("../data/seoul_municipalities_topo_simple.json", function(error, data) {
      const features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;
      
    
      map.selectAll("path")
          .data(features)
        .enter().append("path")
          .attr("class", function(d) { console.log(); return "municipality c" + d.properties.SIG_CD })
          .attr("d", path)
          .attr("fill", function(d) { return "white" });
          
    
      map.selectAll("text")
          .data(features)
        .enter().append("text")
          .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .attr("class", "municipality-label")
          .text(function(d) { return d.properties.SIG_KOR_NM; });
    });
  }

  render() {
    return(
      <Map id="chart"></Map>
    )
  }
}

export default MapChart;

const Map = styled.div`
  svg circle {
    fill: orange;
    opacity: .5;
    stroke: white;
  }
  svg circle:hover {
    fill: red;
    stroke: #333;
  }
  svg text {
    pointer-events: none;
  }
  svg .municipality {
    stroke: #fff;
  }
  svg .municipality-label {
    fill: #bbb;
    font-size: 12px;
    font-weight: 300;
    text-anchor: middle;
  }
  svg #map text {
    color: #333;
    font-size: 10px;
    text-anchor: middle;
  }
  svg #places text {
    color: #777;
    font: 10px sans-serif;
    text-anchor: start;
  }
`