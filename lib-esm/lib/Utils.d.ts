declare enum MOUNTING_POINTS {
    head = "head",
    body = "body"
}
declare const googleMapsLoaded: () => boolean;
declare const getOwnKeysOfObject: (boject: object) => string[];
declare const loadScript: (src: string, id: string, async?: boolean, defer?: boolean, mountingPoint?: MOUNTING_POINTS) => Promise<unknown>;
declare const elementExists: (id: string) => true;
declare const removeElement: (id: string) => void;
export { loadScript, googleMapsLoaded, getOwnKeysOfObject, elementExists, removeElement };
