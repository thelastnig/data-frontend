import React, {Component} from 'react';
import * as d3 from "d3";
import styled from "styled-components";
import * as topojson from 'topojson-client';

class MapChart extends Component {
  componentDidMount() {
    
    console.log(this.props.selectedArea)
    this.drawChart();
  }

  select = (area) => {
    const { selectArea } = this.props;
    selectArea(area);
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

    var color = d3.scaleSequential()
	  .domain([300000, 1800000])
    .interpolator(d3.interpolateBuPu);
    
    d3.json("seoul_municipalities_topo_simple.json").then(data => {
      const features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;
      
      map.selectAll("path")
          .data(features)
        .enter().append("path")
          .attr("class", function(d) { console.log(); return "municipality c" + d.properties.SIG_CD })
          .attr("d", path)
          .attr("fill", function(d) { return color(d.properties.PRICE) })
          .on("mouseover", function(d) {

            d3.select(this)
            // .attr("transform", "translate(5, 0)")
            .raise()

            map.append("text")
            .attr("id", d.properties.SIG_CD)
            .attr("transform", "translate(" + path.centroid(d) + ")")
            .attr("dy", ".35em")
            .attr("class", "municipality-label")
            .text(d.properties.SIG_KOR_NM);

            map.append("text")
            .attr("id", d.properties.SIG_CD)
            .attr("transform", "translate(" + path.centroid(d)[0] + ", " + (path.centroid(d)[1] + 15) + ")")
            .attr("dy", ".35em")
            .attr("class", "municipality-label_num")
            .text(d.properties.PRICE);
          })
          .on("mouseout",  function(d) {
            d3.select(this)
            .attr("d", path)

            d3.select(".municipality-label").remove();
            d3.select(".municipality-label_num").remove();
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
  svg .municipality {
    stroke: #868e96;
    cursor: pointer;
  }
  svg .municipality-label {
    fill: black;
    font-size: 12px;
    font-weight: 600;
    text-anchor: middle;
    font-family: 'Work Sans', 'Helvetica Neue', sans-serif;
  }
  svg .municipality-label_num {
    fill: black;
    font-size: 12px;
    font-weight: 600;
    text-anchor: middle;
    font-family: 'Work Sans', 'Helvetica Neue', sans-serif;
  }
`