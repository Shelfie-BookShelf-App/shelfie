import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const sampleData = () => {
  const data = [];

  data.push({
    date: `11/18`,
    value: Math.floor(Math.random() * 100) + 1
  });

  data.push({
    date: `11/19`,
    value: Math.floor(Math.random() * 100) + 1
  });

  data.push({
    date: `11/20`,
    value: Math.floor(Math.random() * 100) + 1
  });

  data.push({
    date: `11/21`,
    value: Math.floor(Math.random() * 100) + 1
  })

  return data;
}

const BarChart = ({ data = sampleData(), width = 400, height = 220 }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) {
      data = sampleData();
      console.log(data);
    }

    const svg = d3.select(ref.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 40};
    // const width = 500 - margin.left - margin.right;
    // const height = 300 - margin.top - margin.bottom;

    svg.attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom + 20);

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
    
    // bar_chart.append('g')
    //   .attr('class', 'y-axis')
    //   .call(d3.axisLeft(y));
    
    bar_chart.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', 'steelblue');

    // Append text labels on top of each bar
    bar_chart.selectAll('.label')
      .data(data)
      .enter().append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.date) + x.bandwidth() / 2)
      .attr('y', d => y(d.value) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d.value);

    d3.select(ref.current)
      .append('text')
      .attr('x', (width + margin.left + margin.right) / 2)
      .attr('y', height + margin.top + margin.bottom + 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('fill', '#000')
      .text('Number of pages read last 4 days');

  }, [data, width, height]);

  return (
    <svg ref={ref}></svg>
  );
};

export default BarChart;