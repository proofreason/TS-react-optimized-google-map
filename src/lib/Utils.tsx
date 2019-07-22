enum MOUNTING_POINTS {
    head = 'head',
    body = 'body',
}

const googleMapsLoaded = () => {
    return typeof google === 'object' && typeof google.maps === 'object';
};

const getOwnKeysOfObject = (boject: object) => {
    return Object.keys(boject).filter((key) => boject.hasOwnProperty(key));
};

const loadScript = (
    src: string,
    id: string,
    async = true,
    defer = true,
    mountingPoint = MOUNTING_POINTS.body,
) =>
    new Promise((resolve, reject) => {
        const tag = document.createElement('script');
        tag.async = async;
        tag.defer = defer;
        tag.onload = resolve;
        tag.onerror = reject;
        tag.src = src;
        tag.id = id;
        const body = document.getElementsByTagName(mountingPoint)[0];
        body && body.appendChild(tag);
    });

const elementExists = (id: string) => {
    return document.getElementById(id) !== null || undefined;
};

const removeElement = (id: string) => {
    const element = document.getElementById(id);
    element && element.remove();
};

export { loadScript, googleMapsLoaded, getOwnKeysOfObject, elementExists, removeElement };
