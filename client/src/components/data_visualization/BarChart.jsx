import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 40};
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    svg.attr('wdith', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom);

    const bar_chart = svg.append('g')
                 .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    const x = d3.scaleBand()
                .domain(data.map(d => d.date))
                .range([0, width])
                .padding(0.1);
    
    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
                .nice()
                .range([height, 0]);

    bar_chart.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));
    
    bar_chart.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));
    
    bar_chart.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', 'steelblue');
  }, [data]);

  return (
    <svg ref={ref}></svg>
  );
};

export default BarChart;