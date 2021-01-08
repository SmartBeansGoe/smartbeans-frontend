import React, { Component } from 'react'

export default class Body extends Component {
  render() {
    var shape_color = "#FF4455";//this.props.color;
    var r = Number("0x" + shape_color.slice(1,3));
    var g = Number("0x" + shape_color.slice(3,5));
    var b = Number("0x" + shape_color.slice(5,7));
    var value = require('color-convert');
    let hsv = value.rgb.hsv(r, g, b);
    let rgb = value.hsv.rgb(hsv[0], hsv[1]-20, hsv[2]);
    let rgb_spot = value.hsv.rgb(hsv[0], hsv[1]-50, hsv[2]);

    var spot_color = "rgb(" + rgb_spot[0] + ", " + rgb_spot[1] + ", " + rgb_spot[2] + ")";
    var body_color = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
    
    return (
      <g transform="translate(-38.136 -44.878)">
      <g stroke={shape_color} strokeLinecap="round">
       <g strokeWidth="4">
        <path d="m55.976 95.281-10.299 19.447" fill={shape_color}/>
        <path d="m97.932 95.281 10.299 19.447" fill={shape_color}/>
        <path d="m70.408 131.12v18.268" fill="none"/>
        <path d="m83.571 131.12v18.268" fill="none"/>
       </g>
       <path d="m66.295 54.094c-6.7097 3.8668-10.848 11.046-10.848 18.819v37.725c-1.26e-4 7.7053 4.0668 14.832 10.684 18.724 6.6758 3.9258 14.932 3.9621 21.641 0.0952 6.7098-3.8669 10.848-11.046 10.848-18.819v-37.725h-0.1079c0.022441-7.683-4.0006-14.805-10.577-18.723-6.6758-3.9258-14.932-3.9621-21.641-0.095171z"
            fill={body_color} strokeLinejoin="bevel" strokeWidth="2.0995"/>
      </g>
      <path d="m68.584 59.1c-4.2164 2.2128-4.1374 5.2036-6.8489 5.0691-2.4357-0.1208-0.14844-4.19 3.1366-6.3996 3.4423-2.3153 6.3684-3.6487 8.5508-3.0515 2.817 0.77079-3.3356 3.5933-4.8385 4.3821z"
            fill={spot_color}/>
     </g>
        )
  }
}

