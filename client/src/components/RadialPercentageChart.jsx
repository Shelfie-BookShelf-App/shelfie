import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const sampleData = () => {
  return Math.floor(Math.random() * 100) + 1;
}

const RadialPercentageChart = ({ progress = sampleData(), width = 250, height = 250 }) => {
  const ref = useRef();

  useEffect(() => {
    const radius = Math.min(width, height) / 2;
    const thickness = 30;

    const svg = d3.select(ref.current)
    svg.selectAll('*').remove();

    svg.attr('width', width)
      .attr('height', height + 50)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const backgroundArc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    svg.append('path')
      .attr('d', backgroundArc)
      .attr('fill', '#e6e6e6');

    const foregroundArc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle((2 * Math.PI * progress) / 100);

    const foregroundPath = svg.append('path')
      .attr('d', foregroundArc)
      .attr('fill', '#3b5998');

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('font-size', '20px')
      .attr('fill', '#000')
      .text(`${progress}%`);

    d3.select(ref.current)
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('fill', '#000')
      .text('Pages read compared to last month');

    return () => {
      d3.select(ref.current).selectAll('*').remove();
    };
  }, [progress, width, height]);

  return (
    <svg ref={ref}></svg>
  );
};

export default RadialPercentageChart;