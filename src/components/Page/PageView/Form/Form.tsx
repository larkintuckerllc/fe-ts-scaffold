import React, { Component } from 'react';
import FormSample from './FormSample';

interface FormState {
  userName: string;
}

export default class Form extends Component<{}, FormState> {
  public state: FormState = {
    userName: '',
  };

  public render() {
    const { userName } = this.state;
    return (
      <div>
        <h2>Form</h2>
        {userName}
        <FormSample doSomething={this.handleDoSomething} />
      </div>
    );
  }
  private handleDoSomething = (userName: string) => {
    window.console.log(userName);
  };
}
