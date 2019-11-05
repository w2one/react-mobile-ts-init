/**
 * dict context
 */
import * as React from "react";

export const DictContext = React.createContext({ value: {} });

export function withDict(Component: any) {
  const displayName = Component.name;
  const C = (props: { [x: string]: any; wrappedComponentRef: any; }) => {
    const { wrappedComponentRef, ...remainingProps } = props;

    return (
      <DictContext.Consumer>
        {context => <Component {...remainingProps} {...context} ref={wrappedComponentRef} />}
      </DictContext.Consumer>
    );
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;

  return C;
}
