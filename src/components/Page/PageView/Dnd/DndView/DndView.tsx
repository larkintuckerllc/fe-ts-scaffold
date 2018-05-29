import React, { Component } from 'react';
import BoxContainer from './BoxContainer';
import CardContainer from './CardContainer';

export default class DndView extends Component<{}, {}> {
  public render() {
    return (
      <div>
        <h2>Drag and Drop</h2>
        <CardContainer text="Wow1" />
        <CardContainer text="Wow2" />
        <CardContainer text="Wow3" />
        <BoxContainer />
        <BoxContainer />
      </div>
    );
  }
}
