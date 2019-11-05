/**
 * user context
 */
import * as React from "react";

export const UserContext = React.createContext({ value: { name: "" } });

export function withUser(Component: any) {
  // const displayName = `withRouter(${Component.displayName || Component.name})`;
  const displayName = Component.name;

  const C = (props: { [x: string]: any; wrappedComponentRef: any; }) => {
    const { wrappedComponentRef, ...remainingProps } = props;

    return (
      <UserContext.Consumer>
        {context => <Component {...remainingProps} {...context} ref={wrappedComponentRef} />}
      </UserContext.Consumer>
    );
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;

  // return hoistStatics(C, Component);
  return C;
}
