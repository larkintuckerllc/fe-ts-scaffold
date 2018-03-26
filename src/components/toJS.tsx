import * as React from 'react';
import { Iterable } from 'immutable';

/* tslint:disable-next-line */

const KEY = 0;
const VALUE = 1;
interface toJSProps {
}
export default <P extends toJSProps>(
  WrappedComponent: React.ComponentType<P>,
) =>
  class toJS extends React.Component<P> {
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
