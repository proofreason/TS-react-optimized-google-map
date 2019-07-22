import { loadScript, removeElement } from '@lib/Utils';
import * as React from 'react';
const { useEffect } = React;

const SCRIPT_ID = 'optimized-google-maps-script';

interface GoogleScriptMounterProps {
    children?: React.ReactNode;
    scriptUrl: string;
    onScriptLoad?: () => void;
}

const DEFUALT_PROPS: GoogleScriptMounterProps = {
    scriptUrl: null,
};

interface GoogleMapScriptProps {
    scriptUrl: string;
    onScriptLoad?: () => void;
}

let alreadyMounted = false;

const useGoogleScript = ({ scriptUrl, onScriptLoad }: GoogleMapScriptProps) => {
    const [scriptLoaded, setScriptLoaded] = React.useState(false);
    useEffect(() => {
        alreadyMounted && onScriptLoad && onScriptLoad();
        !alreadyMounted &&
            loadScript(scriptUrl, SCRIPT_ID)
                .then(() => {
                    setScriptLoaded(true);
                    onScriptLoad && onScriptLoad();
                })
                .catch((error) => console.error(`error during script load: ${error}`));
        alreadyMounted = true;
    }, []);
    return scriptLoaded;
};

const GoogleScriptMounter = (props: GoogleScriptMounterProps = DEFUALT_PROPS) => {
    const currentProps = { ...DEFUALT_PROPS, ...props };
    const { scriptUrl, onScriptLoad, children } = currentProps;

    useGoogleScript({ scriptUrl, onScriptLoad });
    return <>{children}</>;
};

export { SCRIPT_ID };

export default GoogleScriptMounter;
