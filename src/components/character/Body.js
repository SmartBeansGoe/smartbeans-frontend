import React, { Component } from 'react'

export default class Body extends Component {
  render() {
    var shape_color = this.props.color;
    var r = Number("0x" + shape_color.slice(1,3));
    var g = Number("0x" + shape_color.slice(3,5));
    var b = Number("0x" + shape_color.slice(5,7));
    var value = require('color-convert');
    let hsv = value.rgb.hsv(r, g, b);
    let rgb = value.hsv.rgb(hsv[0], hsv[1]-20, hsv[2]);

    var body_color = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
    
    return (
      <g>
        <path
          d="M28.159 9.216c-6.71 3.867-10.848 11.046-10.848 18.819V65.76c0 7.705 4.067 14.832 10.684 18.724a21.494 21.494 0 0021.641.095c6.71-3.867 10.848-11.046 10.848-18.819V28.035h-.108c.023-7.683-4-14.805-10.577-18.723a21.494 21.494 0 00-21.64-.095z"
          fill={body_color}
          stroke={shape_color}
          strokeLinecap="round"
          strokeLinejoin="bevel"
          strokeWidth={2.099}
        />
        <g fill={shape_color} stroke={shape_color}>
          <path
            d="M61.739 56.602a1.333 1.333 0 00-.72 1.748l7.71 18.503c.285.683 1.064 1.004 1.748.72s1.024-1.074.72-1.748L60.504 52.172c.52 1.533 1.917 4.145 1.234 4.43z"
            strokeWidth={2.217}
          />
          <path
            d="M49.138 85.392l-1.59.872c-.464.256-1.263 1.858-1.26 2.648l.03 12.007c.002.79.395 1.426.886 1.426h1.047c.491 0 .887-.636.887-1.426V85.392c0-.79.465-.255 0 0z"
            strokeWidth={2.277}
          />
          <path
            d="M15.968 56.602a1.333 1.333 0 01.72 1.748l-7.71 18.503a1.333 1.333 0 01-1.748.72c-.683-.286-1.024-1.074-.72-1.748l10.692-23.653c-.52 1.533-1.917 4.145-1.234 4.43z"
            strokeWidth={2.217}
          />
        </g>
        <path
          d="M30.448 14.222c-4.216 2.213-4.137 5.204-6.849 5.07-2.436-.122-.148-4.19 3.137-6.4 3.442-2.316 6.368-3.65 8.55-3.052 2.818.77-3.335 3.593-4.838 4.382z"
          fill="#fff9d5"
        />
        <path
          d="M28.563 85.392l1.59.872c.464.256 1.263 1.858 1.26 2.648l-.03 12.007c-.002.79-.395 1.426-.886 1.426H29.45c-.491 0-.887-.636-.887-1.426V85.392c0-.79-.465-.255 0 0z"
          fill={shape_color}
          stroke={shape_color}
          strokeLinecap="round"
          strokeLinejoin="bevel"
          strokeWidth={2.277}
        />
      </g>
    )
  }
}
