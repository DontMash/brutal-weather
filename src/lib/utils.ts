export const timeout = (ms: number) => {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
};

export const get = (url: string): Promise<unknown> =>
    new Promise(async (resolve, reject) => {
        try {
            // just for show
            await timeout(500);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });

export const updateQuery = (params: URLSearchParams, reload: boolean = true) => {
    const paramString = params.toString();
    if (reload) {
        window.location.search = paramString;
    } else {
        const query = `${window.location.pathname}${paramString ? '?' : ''}${paramString}${window.location.hash}`;
        history.pushState(undefined, '', query);
    }
};

export const getGeolocation = (): Promise<GeolocationPosition> => new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation)
        return reject('Your browser does not support geolocation');

    const error = () => reject(new Error('Unable to get your location'));

    navigator.geolocation.getCurrentPosition(resolve, error);
});
