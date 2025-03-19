import type { DataNode } from "antd/lib/tree";
import { TREE_TMP_KEY } from "constants/tree";

export const cleanupTmpNodes = (nodes: DataNode[]) => {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.key.toString().includes(TREE_TMP_KEY)) {
            nodes.splice(i, 1);
        }

        if (node.children) {
            cleanupTmpNodes(node.children);
        }
    }
};