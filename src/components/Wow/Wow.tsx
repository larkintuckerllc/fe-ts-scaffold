/* tslint:disable-next-line */
import React from 'react';
import kittenPng from './kitten.png';
import * as stylesLess from './styles.less';

export default function () {
  return (
    <div>
      <h2 className={stylesLess.wow}>WOW</h2>
      <img src={kittenPng} />
    </div>
  );
}
