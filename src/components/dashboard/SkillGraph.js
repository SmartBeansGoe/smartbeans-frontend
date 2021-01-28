import React, { Component } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

export default class SkillGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    console.log('SkillGraph did mount.');
    this.chart();
  }

  chart() {
    const myChartRef = this.chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'radar',
      data: {
        labels: this.props.skills.map((el) => el.name),
        datasets: [
          {
            label: 'Skills',
            data: this.props.skills.map(
              (el) => (el.points / el.max_points) * 100
            ),
            backgroundColor: '#99ccff',
            borderColor: '#4da6ff',
          },
        ],
      },
      options: {
        scale: {
          angleLines: {
            display: true,
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
            stepSize: 20,
          },
        },
        tooltips: {
          callbacks: {
            title: function () {
              return '';
            },
            label: function (object, chart) {
              return chart.labels[object.index] + ': ' + Math.round(object.value*100)/100;;
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

SkillGraph.propTypes = {
  skills: PropTypes.array.isRequired,
};
