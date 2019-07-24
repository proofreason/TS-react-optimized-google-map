import * as React from 'react';
import { Subtract } from 'utility-types';

type ContextSelectorType<Properties> = () => Properties;

interface ExtendedProps<Properties> {
    context: Properties;
}

const withContex = <T extends ExtendedProps<Properties>, Properties>(
    WrappedComponent: React.ComponentType<T>,
    selector: ContextSelectorType<Properties>,
) => {
    type ResultComponentProps = Subtract<T, ExtendedProps<Properties>>;
    return (props: ResultComponentProps) => {
        const selectedContextProps = selector();
        return <WrappedComponent context={selectedContextProps} {...(props as T)} />;
    };
};

export { ContextSelectorType, ExtendedProps };

export default withContex;
