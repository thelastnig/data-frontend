import React, {Component} from 'react';
import * as d3 from "d3";
import styled from "styled-components";
import * as topojson from 'topojson-client';
import geoData from './seoul_municipalities_topo_simple.json';

class MapChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  select = (area) => {
    const { selectArea } = this.props;
    selectArea(area);
  }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  drawChart = () => {    
    
    const width = 680;
    const height = 600;

    const svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height);
    const map = svg.append("g").attr("id", "map");

    const projection = d3.geoMercator()
    .center([126.9895, 37.5651])
    .scale(85500)
    .translate([width/2, height/2]);
   
    const path = d3.geoPath(projection);      

    let color = d3.scaleSequential()
	  .domain([300000, 1800000])
    .interpolator(d3.interpolateBuPu);
    
    d3.json("./seoul_municipalities_topo_simple.json").then(error, data => {
      if (error) throw error;
      // data = JSON.parse(JSON.stringify(geoData));
      data = geoData;
      const features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;
      
      map.selectAll("path")
          .data(features)
        .enter().append("path")
          .attr("class", function(d) { console.log(); return "municipality c" + d.properties.SIG_CD })
          .attr("d", path)
          .attr("fill", function(d) { return color(d.properties.PRICE) })
          .on("mouseover", function(d) {

            d3.select(this)
            .attr("stroke", "#495057")
            .attr("stroke-width", "4")
            .raise()

            const coord = d3.select(this)
            .node()
            .getBBox()

            map.append("text")
            .attr("id", d.properties.SIG_CD)
            // .attr("transform", "translate(" + path.centroid(d) + ")")
            .attr("transform", "translate(" + (path.centroid(d)[0] + 50) + ", " + (path.centroid(d)[1] - 57) + ")")
            .attr("dy", ".35em")
            .attr("class", "municipality-label")
            .text(d.properties.SIG_KOR_NM);

            map.append("text")
            .attr("id", d.properties.SIG_CD)
            .attr("transform", "translate(" + (path.centroid(d)[0] + 50) + ", " + (path.centroid(d)[1] - 40) + ")")
            .attr("dy", ".35em")
            .attr("class", "municipality-label_num")
            .text(d.properties.PRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

            map.insert("rect", "text")
            .attr("transform", "translate(" + path.centroid(d)[0] + ", " + (path.centroid(d)[1] - 75) + ")")
            .attr("width", 100)
            .attr("height", 50)
            .attr("fill", "#495057")
            .attr("stroke", "white")
            .attr("class", "municipality-rect")
          })
          .on("mouseout",  function(d) {

            d3.select(this)
            .attr("stroke", "#868e96")
            .attr("stroke-width", "1")

            d3.select(".municipality-label").remove();
            d3.select(".municipality-label_num").remove();
            d3.select(".municipality-rect").remove();
          })
          .on("click", d => {
            const selected = d.properties.SIG_KOR_NM;
            this.select(selected);
          }) 
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
  @keyframes fadeIn {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
  svg .municipality {
    stroke: #868e96;
    cursor: pointer;
  }
  svg .municipality-label {
    fill: white;
    font-size: 13px;
    text-anchor: middle;
    font-family: 'Noto Sans KR', 'Helvetica Neue', sans-serif;
    letter-spacing: 1px;
    animation-duration: 1s;
    animation-name: fadeIn;
  }
  svg .municipality-label_num {
    fill: white;
    font-size: 13px;
    text-anchor: middle;
    font-family: 'Work Sans', 'Helvetica Neue', sans-serif;
    animation-duration: 1s;
    animation-name: fadeIn;
  }
  svg .municipality-rect {
    animation-duration: 1s;
    animation-name: fadeIn;
  }

`