import type { Location } from './weather/geocoding';

export type Favorite = {
    id: number,
    location: Location,
    query: string,
};

const FAVORITES_DATABASE_IDENTIFIER: string = 'favorites_data';
const FAVORITES_DATABASE_VERSION: number = 1;
const FAVORITES_STORE_IDENTIFIER: string = 'favorites_store';

class FavoritesService {
    private db: IDBDatabase;

    private create(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.db) return resolve();

            const openRequest = window.indexedDB.open(FAVORITES_DATABASE_IDENTIFIER, FAVORITES_DATABASE_VERSION);
            openRequest.onerror = (event: Event) => reject(new Error('Cannot open database'));
            openRequest.onblocked = (event: IDBVersionChangeEvent) => reject('Cannot open database (blocked)');
            openRequest.onsuccess = (event: Event) => {
                const request = event.target as IDBOpenDBRequest;
                this.db = request.result;
                this.db.onerror = (event: Event) => reject('Database error');
                resolve();
            };
            openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const request = event.target as IDBOpenDBRequest;
                this.db = request.result;
                this.db.onerror = (event: Event) => reject('Database error');

                try {
                    request.transaction.objectStore(FAVORITES_STORE_IDENTIFIER);
                } catch (error) {
                    const store = this.db.createObjectStore(FAVORITES_STORE_IDENTIFIER, { keyPath: 'id' });
                    store.createIndex('location', 'location', { unique: false });
                    store.createIndex('query', 'query', { unique: false });
                }
            };
        });
    }

    add(location: Location): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            this.create().then(() => {
                const transaction = this.db.transaction(FAVORITES_STORE_IDENTIFIER, 'readwrite');
                transaction.onerror = (event) => reject(new Error(`Database transaction error`));
                transaction.onabort = (event) => reject(new Error('Database transaction aborted'));

                const params = new URLSearchParams({
                    'id': location.id.toString(),
                    'name': location.name,
                });
                const favorite: Favorite = {
                    id: location.id,
                    location,
                    query: params.toString(),
                };
                const store = transaction.objectStore(FAVORITES_STORE_IDENTIFIER);
                const storeRequest = store.put(favorite);
                storeRequest.onerror = (event) => reject(new Error('Store request error'));
                storeRequest.onsuccess = (event) => resolve();
            }).catch(reject));
    }

    remove(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            this.create().then(() => {
                const transaction = this.db.transaction(FAVORITES_STORE_IDENTIFIER, 'readwrite');
                transaction.onerror = (event) => reject(new Error(`Database transaction error`));
                transaction.onabort = (event) => reject(new Error('Database transaction aborted'));

                const store = transaction.objectStore(FAVORITES_STORE_IDENTIFIER);
                const storeRequest = store.delete(id);
                storeRequest.onerror = (event) => reject(new Error('Store request error'));
                storeRequest.onsuccess = (event) => resolve();
            }).catch(reject));
    }

    has(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.get(id)
                .then(() => resolve())
                .catch(reject);
        });
    }

    get(id: number): Promise<Favorite> {
        return new Promise<Favorite>((resolve, reject) =>
            this.create().then(() => {
                const transaction = this.db.transaction(FAVORITES_STORE_IDENTIFIER, 'readwrite');
                transaction.onerror = (event) => reject(new Error(`Database transaction error`));
                transaction.onabort = (event) => reject(new Error('Database transaction aborted'));

                const store = transaction.objectStore(FAVORITES_STORE_IDENTIFIER);
                const storeRequest = store.get(id);
                storeRequest.onerror = (event) => reject(new Error('Store request error'));
                storeRequest.onsuccess = (event) => {
                    if (storeRequest.result) {
                        return resolve(storeRequest.result);
                    }
                    else {
                        return reject(new Error('Entry not available'));
                    }
                };
            }).catch(reject));
    }

    getAll(): Promise<Array<Favorite>> {
        return new Promise<Array<Favorite>>((resolve, reject) =>
            this.create().then(() => {
                const transaction = this.db.transaction(FAVORITES_STORE_IDENTIFIER, 'readwrite');
                transaction.onerror = (event) => reject(new Error(`Database transaction error`));
                transaction.onabort = (event) => reject(new Error('Database transaction aborted'));

                const store = transaction.objectStore(FAVORITES_STORE_IDENTIFIER);
                const storeRequest = store.getAll();
                storeRequest.onerror = (event) => reject(new Error('Store request error'));
                storeRequest.onsuccess = (event) => resolve(storeRequest.result);
            }).catch(reject));
    }
}

const favoritesService = new FavoritesService();
export default favoritesService;
