import { UseFormReturnType } from "@mantine/form/lib/use-form";

export interface EddoCallback<T> {
    create: (x: T) => void,
	update: (x: T) => void,
	delete: (x: T) => void
}