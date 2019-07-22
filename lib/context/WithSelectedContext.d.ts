import * as React from 'react';
declare type ContextSelectorType<Properties> = () => Properties;
interface ExtendedProps<Properties> {
    context: Properties;
}
declare const withContex: <T extends ExtendedProps<Properties>, Properties>(WrappedComponent: React.ComponentType<T>, selector: ContextSelectorType<Properties>) => (props: Pick<T, import("utility-types").SetDifference<keyof T, "context">>) => JSX.Element;
export { ContextSelectorType, ExtendedProps };
export default withContex;
