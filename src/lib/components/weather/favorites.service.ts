import type { Location } from '$lib/weather/geocoding';

export type Favorite = {
	id: number;
	location: Location;
	query: string;
};

const FAVORITES_DATABASE_IDENTIFIER = 'favorites_data';
const FAVORITES_DATABASE_VERSION = 1;
const FAVORITES_STORE_IDENTIFIER = 'favorites_store';

let db: IDBDatabase | undefined;

const create = (): Promise<void> =>
	new Promise<void>((resolve, reject) => {
		if (db) return resolve();

		const openRequest = indexedDB.open(FAVORITES_DATABASE_IDENTIFIER, FAVORITES_DATABASE_VERSION);
		openRequest.onerror = () => reject(new Error('Cannot open database'));
		openRequest.onblocked = () => reject('Cannot open database (blocked)');
		openRequest.onsuccess = (event: Event) => {
			const request = event.target as IDBOpenDBRequest;
			db = request.result;
			db.onerror = () => reject(new Error('Database error'));
			resolve();
		};
		openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
			const request = event.target as IDBOpenDBRequest;
			db = request.result;
			db.onerror = () => reject(new Error('Database error'));

			try {
				if (request.transaction) request.transaction.objectStore(FAVORITES_STORE_IDENTIFIER);
				else return reject(new Error('No transaction on request'));
			} catch (error) {
				const store = db.createObjectStore(FAVORITES_STORE_IDENTIFIER, { keyPath: 'id' });
				store.createIndex('location', 'location', { unique: false });
				store.createIndex('query', 'query', { unique: false });
			}
		};
	});

export const add = (location: Location): Promise<void> =>
	new Promise<void>((resolve, reject) =>
		create()
			.then(() => {
				if (!db) return reject(new Error('Database not available'));

				const transaction = db.transaction(FAVORITES_STORE_IDENTIFIER, 'readwrite');
				transaction.onerror = () => reject(new Error(`Database transaction error`));
				transaction.onabort = () => reject(new Error('Database transaction aborted'));

				const params = new URLSearchParams({
					id: location.id.toString(),
					name: location.name
				});
				const favorite: Favorite = {
					id: location.id,
					location,
					query: params.toString()
				};
				const store = transaction.objectStore(FAVORITES_STORE_IDENTIFIER);
				const storeRequest = store.put(favorite);
				storeRequest.onerror = () => reject(new Error('Store request error'));
				storeRequest.onsuccess = () => resolve();
			})
			.catch(reject)
	);

export const remove = (id: number): Promise<void> =>
	new Promise<void>((resolve, reject) =>
		create()
			.then(() => {
				if (!db) return reject(new Error('Database not available'));

				const transaction = db.transaction(FAVORITES_STORE_IDENTIFIER, 'readwrite');
				transaction.onerror = () => reject(new Error(`Database transaction error`));
				transaction.onabort = () => reject(new Error('Database transaction aborted'));

				const store = transaction.objectStore(FAVORITES_STORE_IDENTIFIER);
				const storeRequest = store.delete(id);
				storeRequest.onerror = () => reject(new Error('Store request error'));
				storeRequest.onsuccess = () => resolve();
			})
			.catch(reject)
	);

export const has = (id: number): Promise<void> =>
	new Promise<void>((resolve, reject) => {
		get(id)
			.then(() => resolve())
			.catch(reject);
	});

export const get = (id: number): Promise<Favorite> =>
	new Promise<Favorite>((resolve, reject) =>
		create()
			.then(() => {
				if (!db) return reject(new Error('Database not available'));

				const transaction = db.transaction(FAVORITES_STORE_IDENTIFIER, 'readwrite');
				transaction.onerror = () => reject(new Error(`Database transaction error`));
				transaction.onabort = () => reject(new Error('Database transaction aborted'));

				const store = transaction.objectStore(FAVORITES_STORE_IDENTIFIER);
				const storeRequest = store.get(id);
				storeRequest.onerror = () => reject(new Error('Store request error'));
				storeRequest.onsuccess = () => {
					if (storeRequest.result) {
						return resolve(storeRequest.result);
					} else {
						return reject(new Error('Entry not available'));
					}
				};
			})
			.catch(reject)
	);

export const getAll = (): Promise<Array<Favorite>> =>
	new Promise<Array<Favorite>>((resolve, reject) =>
		create()
			.then(() => {
				if (!db) return reject(new Error('Database not available'));

				const transaction = db.transaction(FAVORITES_STORE_IDENTIFIER, 'readwrite');
				transaction.onerror = () => reject(new Error(`Database transaction error`));
				transaction.onabort = () => reject(new Error('Database transaction aborted'));

				const store = transaction.objectStore(FAVORITES_STORE_IDENTIFIER);
				const storeRequest = store.getAll();
				storeRequest.onerror = () => reject(new Error('Store request error'));
				storeRequest.onsuccess = () => resolve(storeRequest.result);
			})
			.catch(reject)
	);
