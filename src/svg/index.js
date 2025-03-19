import React from 'react';
import {Svg, Path} from 'react-native-svg';

/* eslint-disable react/react-in-jsx-scope */
const loginArrow = `<svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 4L14.8787 9.87868C16.0503 11.0503 16.0503 12.9497 14.8787 14.1213L9 20" stroke="#00596B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 6.66663L21.9191 10.5857C22.7002 11.3668 22.7002 12.6331 21.9191 13.4142L18 17.3333" stroke="#87b6cc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const logoSvg = `<svg width="20" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="10.1426" width="2" height="20.2852" rx="1" transform="rotate(30 10.1426 0)" fill="white"/>
<rect x="8.96289" y="8.67322" width="2" height="9.71826" rx="1" transform="rotate(30 8.96289 8.67322)" fill="white"/>
<rect x="5.96289" y="0.31189" width="2" height="10" rx="1" transform="rotate(30 5.96289 0.31189)" fill="white"/>
</svg>
`;

const logoSvgPrimary = `<svg width="20" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10.1426" width="2" height="20.2852" rx="1" transform="rotate(30 10.1426 0)" fill="#00596B"/>
  <rect x="8.96289" y="8.67322" width="2" height="9.71826" rx="1" transform="rotate(30 8.96289 8.67322)" fill="#00596B"/>
  <rect x="5.96289" y="0.31189" width="2" height="10" rx="1" transform="rotate(30 5.96289 0.31189)" fill="#00596B"/>
</svg>
`;

const logoSvgRed = `<svg width="20" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10.1426" width="2" height="20.2852" rx="1" transform="rotate(30 10.1426 0)" fill="#a80000"/>
  <rect x="8.96289" y="8.67322" width="2" height="9.71826" rx="1" transform="rotate(30 8.96289 8.67322)" fill="#a80000"/>
  <rect x="5.96289" y="0.31189" width="2" height="10" rx="1" transform="rotate(30 5.96289 0.31189)" fill="#a80000"/>
</svg>
`;

const logoSvgSecondary = `<svg width="20" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10.1426" width="2" height="20.2852" rx="1" transform="rotate(30 10.1426 0)" fill="#E8B000"/>
  <rect x="8.96289" y="8.67322" width="2" height="9.71826" rx="1" transform="rotate(30 8.96289 8.67322)" fill="#E8B000"/>
  <rect x="5.96289" y="0.31189" width="2" height="10" rx="1" transform="rotate(30 5.96289 0.31189)" fill="#E8B000"/>
</svg>
`;

// const electrician_svg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M43.7502 29.1667C43.7502 28.0208 42.8127 27.0833 41.6668 27.0833H37.5002V31.25H41.6668C42.8127 31.25 43.7502 30.3125
//  43.7502 29.1667ZM41.6668 35.4167H37.5002V39.5833H41.6668C42.8127 39.5833 43.7502 38.6458 43.7502 37.5C43.7502 36.3542 42.8127
//   35.4167 41.6668 35.4167ZM25.0002 29.1667H20.8335V37.5H25.0002C25.0002 39.7917 26.8752 41.6667 29.1668 41.6667H35.4168V25H29.1668C26.8752
//    25 25.0002 26.875 25.0002 29.1667Z" fill="#00596B"/>
// <path d="M10.4167 27.0833C10.4167 24.7916 12.2917 22.9166 14.5833 22.9166H17.7083C21.7292 22.9166 25 19.6458 25
// 15.6249C25 11.6041 21.7292 8.33325 17.7083 8.33325H10.4167C9.27083 8.33325 8.33333 9.27075 8.33333 10.4166C8.33333
//  11.5624 9.27083 12.4999 10.4167 12.4999H17.7083C19.4375 12.4999 20.8333 13.8958 20.8333 15.6249C20.8333 17.3541 19.4375 18.7499
//   17.7083 18.7499H14.5833C9.97917 18.7499 6.25 22.4791 6.25 27.0833C6.25 31.6874 9.97917 35.4166 14.5833 35.4166H18.75V31.2499H14.5833C12.2917
//    31.2499 10.4167 29.3749 10.4167 27.0833Z" fill="#00596B"/>
// </svg>`;

const ElectricianSvg = ({width = 50, height = 50, color = '#00596B'}) => (
  <Svg width={width} height={height} viewBox="0 0 50 50" fill="none">
    <Path
      d="M43.7502 29.1667C43.7502 28.0208 42.8127 27.0833 41.6668 27.0833H37.5002V31.25H41.6668C42.8127 31.25 43.7502 30.3125 43.7502 29.1667ZM41.6668 35.4167H37.5002V39.5833H41.6668C42.8127 39.5833 43.7502 38.6458 43.7502 37.5C43.7502 36.3542 42.8127 35.4167 41.6668 35.4167ZM25.0002 29.1667H20.8335V37.5H25.0002C25.0002 39.7917 26.8752 41.6667 29.1668 41.6667H35.4168V25H29.1668C26.8752 25 25.0002 26.875 25.0002 29.1667Z"
      fill={color}
    />
    <Path
      d="M10.4167 27.0833C10.4167 24.7916 12.2917 22.9166 14.5833 22.9166H17.7083C21.7292 22.9166 25 19.6458 25 15.6249C25 11.6041 21.7292 8.33325 17.7083 8.33325H10.4167C9.27083 8.33325 8.33333 9.27075 8.33333 10.4166C8.33333 11.5624 9.27083 12.4999 10.4167 12.4999H17.7083C19.4375 12.4999 20.8333 13.8958 20.8333 15.6249C20.8333 17.3541 19.4375 18.7499 17.7083 18.7499H14.5833C9.97917 18.7499 6.25 22.4791 6.25 27.0833C6.25 31.6874 9.97917 35.4166 14.5833 35.4166H18.75V31.2499H14.5833C12.2917 31.2499 10.4167 29.3749 10.4167 27.0833Z"
      fill={color}
    />
  </Svg>
);

export {
  loginArrow,
  logoSvg,
  logoSvgPrimary,
  logoSvgSecondary,
  logoSvgRed,
  ElectricianSvg,
};
