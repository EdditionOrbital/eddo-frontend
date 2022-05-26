export interface EddoCallback<T> {
    add: (x: T) => void,
	update: (x: T) => void,
	delete: (_id: string) => void
}