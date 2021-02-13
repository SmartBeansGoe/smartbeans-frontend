import React, { Component } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import { BLUE, LIGHTBLUE } from '../../js/constants';

export default class SkillGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    // console.log('SkillGraph did mount.');
    this.chart();
  }

  chart() {
    const myChartRef = this.chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'radar',
      data: {
        labels: this.props.skills
          .sort(function (a, b) {
            return a.name.localeCompare(b.name);
          })
          .map((el) => el.name),
        datasets: [
          {
            data: this.props.skills
              .sort(function (a, b) {
                return a.name.localeCompare(b.name);
              })
              .map((el) => (el.points / el.max_points) * 100),
            backgroundColor: LIGHTBLUE,
            borderColor: BLUE,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scale: {
          angleLines: {
            display: true,
            lineWidth: 4,
          },
          gridLines: {
            display: true,
            lineWidth: 4,
          },

          pointLabels: {
            fontSize: 16,
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
            stepSize: 20,
            fontSize: 14,
          },
        },
        elements: {
          line: {
            tension: 0,
            borderWidth: 3,
          },
          point: {
            radius: 4,
            borderWidth: 3,
            hoverRadius: 6,
            hoverBorderWidth: 4,
          },
        },
        tooltips: {
          bodyFontSize: 16,
          callbacks: {
            title: function () {
              return '';
            },
            label: function (object, chart) {
              return (
                chart.labels[object.index] +
                ': ' +
                Math.round(object.value * 100) / 100
              );
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
