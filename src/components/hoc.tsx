/* tslint:disable-next-line */
import React, { Component } from 'react';

interface ExternalProps {
  style?: React.CSSProperties;
}
export interface InjectedProps {
  clickCount: number;
}
interface State {
  clickCount: number;
}
interface Options {
  debug?: boolean;
}
export const hoc = ({ debug = false }: Options = {}) =>
  <TOriginalProps extends {}>(
    /* tslint:disable-next-line */
    WrappedComponent: (React.ComponentClass<TOriginalProps & InjectedProps>
      | React.StatelessComponent<TOriginalProps & InjectedProps>),
  ) => {
    type ResultProps = TOriginalProps & ExternalProps;
    const result = class ClickCounted extends Component<ResultProps, State> {
      static displayName = `ClickCounted(${WrappedComponent.displayName || WrappedComponent.name})`;
      constructor(props: ResultProps) {
        super(props);
        this.state = {
          clickCount: 0,
        };
      }
      handleClick = () => {
        if (debug) {
          console.log('Clicked');
        }
        this.setState(state => ({ clickCount: state.clickCount + 1 }));
      }
      render() {
        const { style } = this.props;
        const { clickCount } = this.state;
        return (
          <div id="test_root" onClick={this.handleClick} style={style}>
            <span>Clicked {clickCount} times</span>
            <WrappedComponent {...this.props} {...this.state} />
          </div>
        );
      }
    };
    return result;
  };
