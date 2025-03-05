import type { TreeProps } from "antd/es/tree";

export type TreeData = TreeProps["treeData"];

export interface TreeManagerInterface {
    addFile(path: string, content: string): Promise<void>;
    addDirectory(path: string): Promise<void>;
    move(sourcePath: string, targetPath: string): Promise<void>;
    delete(path: string): Promise<void>;
    getTree(): Promise<TreeData>;
    setTree(tree: TreeData): Promise<void>;
}
