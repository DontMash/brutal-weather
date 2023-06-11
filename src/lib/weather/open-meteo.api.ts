export type ResponseSuccess<T> = {
	results: Array<T>;
};
export type ResponseError = {
	error: boolean;
	reason: string;
};
export type Response<T> = T & ResponseSuccess<T> & ResponseError;
