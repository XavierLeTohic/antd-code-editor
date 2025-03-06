import { EnterOutlined, FileOutlined } from "@ant-design/icons";
import { Flex, Input } from "antd";
import NewFileInput from "components/explorer/NewFileInput";
import NewFolderInput from "components/explorer/NewFolerInput";
import { TREE_ROOT_KEY, TREE_TMP_KEY } from "constants/tree";
import type { PersisterStrategy } from "types/persister";
import type { TreeData, TreeManagerInterface } from "types/tree";
export class TreeManager implements TreeManagerInterface {
	private tree: TreeData = [];

	constructor(private persister: PersisterStrategy) {}

	async initialize(): Promise<void> {
		this.tree = (await this.persister.load()) || [];
	}

	public async getTree(): Promise<TreeData> {
		return this.tree;
	}

	public async setTree(tree: TreeData): Promise<void> {
		this.tree = tree;
	}

	async addFile(path = TREE_ROOT_KEY): Promise<void> {
		const existingTree = await this.getTree();
		let tree = existingTree ? [...existingTree] : [];

		// Filter out any tmp nodes
		tree = tree.filter((node) => !node.key.toString().includes(TREE_TMP_KEY));

		tree.push({
			key: `${path}/${TREE_TMP_KEY}`,
			icon: () => null,
			title: <NewFileInput />,
			isLeaf: true,
		});

		this.tree = tree;
		// Note: not persisting until the filename is set with NewFileInput
	}

	async addDirectory(path?: string): Promise<void> {
		const existingTree = await this.getTree();
		let tree = existingTree ? [...existingTree] : [];

		// Filter out any tmp nodes
		tree = tree.filter((node) => !node.key.toString().includes(TREE_TMP_KEY));

		tree.push({
			key: `${path}/${TREE_TMP_KEY}`,
			icon: () => null,
			title: <NewFolderInput />,
			isLeaf: true,
		});

		this.tree = tree;
		// Note: not persisting until the filename is set with NewFileInput
	}

	async move(sourcePath: string, targetPath: string): Promise<void> {
		const tree = await this.getTree();
		// Move logic here
		await this.persister.persistContent(tree);
	}

	async delete(path: string): Promise<void> {
		const tree = await this.getTree();
		// Delete logic here
		await this.persister.persistContent(tree);
	}
}
