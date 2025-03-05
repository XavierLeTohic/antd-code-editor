import type { TreeData } from "types/tree";

export interface PersisterStrategy {
    type: "memory" | "fileSystem";
    content: TreeData;
    persistContent: (content: TreeData) => Promise<void>;
    load: () => Promise<TreeData | null>;
    delete: () => Promise<void>;
}

export interface PersisterContextType {
    persister: PersisterStrategy;
    setPersister: (persister: PersisterStrategy) => void;
    save: (content: TreeData) => Promise<void>;
    load: () => Promise<TreeData | null>;
    delete: () => Promise<void>;
}