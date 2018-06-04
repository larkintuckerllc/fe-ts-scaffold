import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { Component, FormEvent } from 'react';
import FormSampleView from './FormSampleView';

interface FormSampleContainerProps {
  form: WrappedFormUtils;
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
      form: { validateFields },
    } = this.props;
    e.preventDefault();
    validateFields((err: boolean, values: FormFields) => {
      if (!err) {
        // DO SOMETHING WITH SUBMITTED VALUES
        window.console.log('Received values of form: ', values);
      }
    });
  };
}
