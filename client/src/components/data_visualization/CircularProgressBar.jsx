import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const CircularProgressBar = ({ progress }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 100;
    const height = 100;
    const thickness = 10;
    const radius = Math.min(width, height) / 2 - thickness;

    svg.attr('width', width).attr('height', height);

    const arc = d3.arc()
      .innerRadius(radius)
      .outerRadius(radius + thickness)
      .startAngle(0)
      .endAngle((2 * Math.PI * progress) / 100);

    svg.selectAll('*').remove();

    svg.append('path')
      .attr('d', arc)
      .attr('fill', 'lightblue')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
      
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('dy', '3.5em')
      .attr('text-anchor', 'middle')
      .attr('fill', '#000')
      .text(`${progress}%`);
  }, [progress]);

  return (
    <svg ref={ref}></svg>
  );
};

export default CircularProgressBar;