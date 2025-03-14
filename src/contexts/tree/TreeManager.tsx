import { EnterOutlined, FileOutlined } from "@ant-design/icons";
import { Flex, Input } from "antd";
import type { DataNode } from "antd/lib/tree";
import NewFileInput from "components/explorer/NewFileInput";
import NewFolderInput from "components/explorer/NewFolderInput";
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

		const isRoot = path === TREE_ROOT_KEY;

		console.log("isRoot", isRoot, path);

		if (isRoot) {
			tree.push({
				key: `${path}/${TREE_TMP_KEY}`,
				icon: () => null,
				title: <NewFileInput path={path} />,
				isLeaf: true,
			});
		} else {
			const findNodeAndInsert = (
				treeData: DataNode[],
				parentNode: DataNode | null,
			) => {
				for (let i = 0; i < treeData.length; i++) {
					const node = treeData[i];

					if (node.key.toString() === path) {
						let nodeToInsert = node;

						if (!path.endsWith("/") && parentNode) {
							nodeToInsert = parentNode;
						}

						if (!nodeToInsert.children) {
							nodeToInsert.children = [];
						}

						nodeToInsert.children?.push({
							key: `${path}${TREE_TMP_KEY}`,
							icon: () => null,
							title: <NewFileInput path={path} />,
							isLeaf: true,
						});
					}

					if (node.children) {
						findNodeAndInsert(node.children, node);
					}
				}
			};

			findNodeAndInsert(tree, null);
		}

		this.tree = tree;
		// Note: not persisting until the filename is set with NewFileInput
	}

	async addDirectory(path = TREE_ROOT_KEY): Promise<void> {
		const existingTree = await this.getTree();
		let tree = existingTree ? [...existingTree] : [];

		// Filter out any tmp nodes
		tree = tree.filter((node) => !node.key.toString().includes(TREE_TMP_KEY));

		const isRoot = path === TREE_ROOT_KEY;

		if (isRoot) {
			tree.push({
				key: `${path}/${TREE_TMP_KEY}`,
				icon: () => null,
				title: <NewFolderInput path={path} />,
				isLeaf: true,
			});
		} else {
			const findNodeAndInsert = (
				treeData: DataNode[],
				parentNode: DataNode | null,
			) => {
				for (let i = 0; i < treeData.length; i++) {
					const node = treeData[i];

					if (node.key.toString() === path) {
						let nodeToInsert = node;

						if (!path.endsWith("/") && parentNode) {
							nodeToInsert = parentNode;
						}

						if (!nodeToInsert.children) {
							nodeToInsert.children = [];
						}

						nodeToInsert.children?.push({
							key: `${path}${TREE_TMP_KEY}/`,
							icon: () => null,
							title: <NewFolderInput path={path} />,
							isLeaf: true,
						});
					}

					if (node.children) {
						findNodeAndInsert(node.children, node);
					}
				}
			};

			findNodeAndInsert(tree, null);
		}

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
