import type { TreeProps } from "antd";
import type { PersisterStrategy } from "types/persister";

export type TreeData = TreeProps["treeData"];

export class InMemoryPersister implements PersisterStrategy {
    public content: TreeData = [];
    public type: PersisterStrategy['type'] = "memory";

    constructor() {
        this.type = "memory";
    }

    private async save(content: TreeData): Promise<void> {
        this.content = Array.isArray(content) ? [...content] : [];
    }

    async persistContent(content: TreeData): Promise<void> {
        await this.save(content);
    }

    async load(): Promise<TreeData | null> {
        return this.content;
    }

    async delete(): Promise<void> {
        this.content = [];
    }
}