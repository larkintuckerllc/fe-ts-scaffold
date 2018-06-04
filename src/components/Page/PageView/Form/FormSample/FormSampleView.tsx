import { Button, Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { FormEvent } from 'react';

interface FormSampleViewProps {
  form: WrappedFormUtils;
  onSubmit: (e: FormEvent<HTMLInputElement>) => void;
}

const FormItem = Form.Item;

const FormSampleView = ({ form: { getFieldDecorator }, onSubmit }: FormSampleViewProps) => (
  <div>
    <h2>Form Sample</h2>
    <Form onSubmit={onSubmit}>
      <FormItem>
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(<Input placeholder="Username" />)}
      </FormItem>
      <FormItem>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </FormItem>
    </Form>
  </div>
);

export default FormSampleView;
