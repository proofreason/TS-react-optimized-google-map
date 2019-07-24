import * as React from 'react';
declare const SCRIPT_ID = "optimized-google-maps-script";
interface GoogleScriptMounterProps {
    children?: React.ReactNode;
    scriptUrl: string;
    onScriptLoad?: () => void;
}
declare const GoogleScriptMounter: (props?: GoogleScriptMounterProps) => JSX.Element;
export { SCRIPT_ID };
export default GoogleScriptMounter;
