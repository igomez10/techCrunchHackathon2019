import React from 'react'
// import  d3 from "d3"
// import topojson from 'topojson'
const d3 = window.d3
const topojson = window.topojson
export class ClientMap extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    var width = 600;
    var height = 400;

    var projection = d3.geo.mercator();
    // set projection parameters

    var svg = d3.select("#clientMap").append("svg") 
        .attr("width", width)
        .attr("height", height);
        console.log(d3.select("#clientMap"))
    var path = d3.geo.path()
        .projection(projection);
    var g = svg.append("g");
    
    d3.json("./world-110m2.json", (error, topology)=> {
        projection.scale(150).center([20, 0])
        g.selectAll("path")
          .data(topojson.object(topology, topology.objects.countries)
              .geometries)
        .enter()
          .append("path")
          .attr("d", path)
        
        // create svg variable
                  // points
                  const instancesCoordinates = [
                    [-122.490402, 37.786453],
                    [-122.389809, 37.72728],
                    [9.0820, 8.6753]
                  ]
                    // add circles to svg
                    svg.selectAll("circle")
                    .data(instancesCoordinates).enter()
                    .append("circle")
                    .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
                    .attr("cy", function (d) { return projection(d)[1]; })
                    .attr("r", "4px")
                    .attr("fill", "red")
    });

    // const data = [12, 5, 6, 6, 9, 10];
      
    // const svg = d3.select("body").append("svg").attr("width", 700).attr("height", 300);
    // svg.selectAll("rect").data(data).enter().append("rect")
  }
  render() {
    return <div id="clientMap"></div>
  }
}