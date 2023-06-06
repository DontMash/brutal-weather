export const timeout = (ms: number) => {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
};

export const get = <T>(url: string): Promise<T> =>
    new Promise(async (resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok)
                    return reject(new Error(`${response.status}: ${response.statusText}`));

                resolve(response.json());
            })
            .catch(reject);
    });

export const getGeolocation = (): Promise<GeolocationPosition> => new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation)
        return reject(new Error('Your browser does not support geolocation'));

    const error = () => reject(new Error('Unable to get your location'));

    navigator.geolocation.getCurrentPosition(resolve, error);
});
