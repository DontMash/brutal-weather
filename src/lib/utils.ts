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
