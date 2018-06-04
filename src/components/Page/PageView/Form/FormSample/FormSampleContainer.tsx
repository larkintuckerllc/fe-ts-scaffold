import { FormComponentProps } from 'antd/lib/form';
import React, { Component, FormEvent } from 'react';
import FormSampleView from './FormSampleView';

interface FormSampleContainerProps extends FormComponentProps {
  doSomething(userName: string): void;
}

interface FormFields {
  userName: string;
}

export default class FormSampleContainer extends Component<FormSampleContainerProps, {}> {
  public render() {
    return <FormSampleView {...this.props} onSubmit={this.handleSubmit} />;
  }

  private handleSubmit = (e: FormEvent<HTMLInputElement>) => {
    const {
      doSomething,
      form: { validateFields },
    } = this.props;
    e.preventDefault();
    validateFields((err: boolean, { userName }: FormFields) => {
      if (!err) {
        doSomething(userName);
      }
    });
  };
}
