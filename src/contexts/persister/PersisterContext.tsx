import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from "react";
import type { PersisterContextType, PersisterStrategy } from "types/persister";
import type { TreeData } from "types/tree";
import { InMemoryPersister } from "./InMemoryPersister";

const PersisterContext = createContext<PersisterContextType | undefined>(
	undefined,
);

interface PersisterProviderProps {
	children: ReactNode;
	initialPersister?: PersisterStrategy;
}

export const PersisterProvider = ({
	children,
	initialPersister = new InMemoryPersister(),
}: PersisterProviderProps) => {
	const [persister, setPersister] =
		useState<PersisterStrategy>(initialPersister);

	const save = useCallback(
		async (content: TreeData) => {
			await persister.persistContent(content);
		},
		[persister],
	);

	const load = useCallback(async () => {
		console.info("[persister] Loading");
		return await persister.load();
	}, [persister]);

	const deleteContent = useCallback(async () => {
		await persister.delete();
	}, [persister]);

	return (
		<PersisterContext.Provider
			value={{
				persister,
				setPersister,
				save,
				load,
				delete: deleteContent,
			}}
		>
			{children}
		</PersisterContext.Provider>
	);
};

export const usePersister = () => {
	const context = useContext(PersisterContext);
	if (!context) {
		throw new Error("usePersister must be used within a PersisterProvider");
	}
	return context;
};

export { InMemoryPersister };
