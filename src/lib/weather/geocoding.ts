export type Location = {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	country: string;
	country_code: string;
	admin1?: string | undefined;
	admin2?: string | undefined;
	admin3?: string | undefined;
	admin4?: string | undefined;
};
