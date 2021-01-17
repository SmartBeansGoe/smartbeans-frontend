import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

export default class RadarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: '',
          data: this.props.category_skill_values,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'radar',
        },
        title: {
          text: this.props.title,
        },
        xaxis: {
          categories: this.props.category_skill_titles,
        },
      },
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radar"
          height={350}
        />
      </div>
    );
  }
}

RadarChart.propTypes = {
  title: PropTypes.string.isRequired,
  category_skill_titles: PropTypes.array.isRequired,
  category_skill_values: PropTypes.array.isRequired,
};
