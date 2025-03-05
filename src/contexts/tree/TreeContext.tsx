import { usePersister } from "contexts/persister";
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import type { TreeData, TreeManagerInterface } from "types/tree";
import { TreeManager } from "./TreeManager";

interface TreeContextType {
	tree: TreeData;
	overrideTree: (tree: TreeData) => void;
	refresh: () => Promise<void>;
	addFile(path: string): Promise<void>;
	addDirectory(path: string): Promise<void>;
	move(sourcePath: string, targetPath: string): Promise<void>;
	delete(path: string): Promise<void>;
	getTree(): Promise<TreeData>;
}

const TreeContext = createContext<TreeContextType | undefined>(undefined);

interface TreeProviderProps {
	children: ReactNode;
}

export const TreeProvider = ({ children }: TreeProviderProps) => {
	const { persister, load } = usePersister();
	const [tree, setTree] = useState<TreeData>([]);
	const [treeManager] = useState<TreeManagerInterface>(
		() => new TreeManager(persister),
	);

	// This is used by NewFileInput
	const overrideTree = useCallback(
		(newTree: TreeData) => {
			setTree(newTree);
			treeManager.setTree(newTree);
		},
		[treeManager],
	);

	const refresh = useCallback(async () => {
		const newTree = await treeManager.getTree();
		setTree(newTree);
	}, [treeManager]);

	const addFile = useCallback(
		async (path: string, content: string) => {
			await treeManager.addFile(path, content);
			await refresh();
		},
		[treeManager, refresh],
	);

	const addDirectory = useCallback(
		async (path: string) => {
			await treeManager.addDirectory(path);
			await refresh();
		},
		[treeManager, refresh],
	);

	const move = useCallback(
		async (sourcePath: string, targetPath: string) => {
			await treeManager.move(sourcePath, targetPath);
			await refresh();
		},
		[treeManager, refresh],
	);

	const deleteItem = useCallback(
		async (path: string) => {
			await treeManager.delete(path);
			await refresh();
		},
		[treeManager, refresh],
	);

	const getTree = useCallback(async () => {
		return await treeManager.getTree();
	}, [treeManager]);

	useEffect(() => {
		refresh();
	}, [refresh]);

	useEffect(() => {
		load();
	}, [load]);

	return (
		<TreeContext.Provider
			value={{
				tree,
				overrideTree,
				refresh,
				addFile,
				addDirectory,
				move,
				delete: deleteItem,
				getTree,
			}}
		>
			{children}
		</TreeContext.Provider>
	);
};

export const useTree = () => {
	const context = useContext(TreeContext);
	if (!context) {
		throw new Error("useTree must be used within a TreeProvider");
	}
	return context;
};

export { TreeManager };
