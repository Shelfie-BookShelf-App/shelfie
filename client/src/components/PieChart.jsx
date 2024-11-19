import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const sampleData = () => {
  return [
    { label: 'romance', value: Math.floor(Math.random() * 100) + 1 },
    { label: 'fiction', value: Math.floor(Math.random() * 100) + 1 },
    { label: 'documentation', value: Math.floor(Math.random() * 100) + 1 },
    { label: 'self-help', value: Math.floor(Math.random() * 100) + 1 },
  ];
};

const PieChart = ({ data = sampleData(), width = 250, height = 250 }) => {
  const ref = useRef();

  useEffect(() => {
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height + 50)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const path = svg.selectAll('path')
      .data(pie(data))
      .enter().append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label));

    svg.selectAll('text')
      .data(pie(data))
      .enter().append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => d.data.label);

    d3.select(ref.current)
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('fill', '#000')
      .text('Categories of books read');
  }, [data, width, height]);

  return (
    <svg ref={ref}></svg>
  );
};

export default PieChart;