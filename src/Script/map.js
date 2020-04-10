const mapScript = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');
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

  </style>
  <div id="chart"></div>
  <script src="http://d3js.org/d3.v4.min.js"></script>
  <script src="http://d3js.org/topojson.v1.min.js"></script>
  <script src="https://d3js.org/d3-color.v1.min.js"></script>
  <script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
  <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
  <script>
    var width = 800,
    height = 600;

    var svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height);
    var map = svg.append("g").attr("id", "map"),
      places = svg.append("g").attr("id", "places");

    var projection = d3.geoMercator()
    .center([126.9895, 37.5651])
    .scale(100000)
    .translate([width/2, height/2]);
   
    var path = d3.geoPath(projection);

    var color = d3.scaleSequential()
	  .domain([400000, 1800000])
    .interpolator(d3.interpolatePurples);

    var yLegend = d3.scaleLinear()
    .domain([1, 11])
    .rangeRound([58, 300]);


    d3.json("seoul_municipalities_topo_simple.json", function(error, data) {
      var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;
      
      map.selectAll("path")
          .data(features)
        .enter().append("path")
          .attr("class", function(d) { console.log(); return "municipality c" + d.properties.SIG_CD })
          .attr("d", path)
          .attr("fill", function(d) { return color(d.properties.PRICE) })
          .on("mouseover", function(d) {

            d3.select(this)
            .attr("transform", "translate(5, 0)")
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
          }); 
    });
  </script>
`

export default mapScript;