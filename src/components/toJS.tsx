import * as React from 'react';
import { Iterable } from 'immutable';

const KEY = 0;
const VALUE = 1;
export default (
  /* tslint:disable-next-line */
  WrappedComponent: React.ComponentType<any>,
) =>
  class toJS extends React.Component<any> {
    render() {
      const wrappedComponentProps = this.props;
      const reducer = (newProps: any, wrappedComponentProp: any) => {
        newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
          wrappedComponentProp[VALUE],
        )
          ? wrappedComponentProp[VALUE].toJS()
          : wrappedComponentProp[VALUE];
        return newProps;
      };
      const propsJS = Object.entries(wrappedComponentProps).reduce(reducer, {});
      return (
        <WrappedComponent
          {...propsJS}
        />
      );
    }
  };