import { EnterOutlined, FolderOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";

import { FileOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import type { DataNode } from "antd/lib/tree";
import { TREE_ROOT_KEY, TREE_TMP_KEY } from "constants/tree";
import { useTree } from "contexts/tree/TreeContext";
import { useState } from "react";

function NewFolderInput({ path }: { path: string }) {
	const { tree, refresh, getTree, overrideTree } = useTree();
	const [isDuplicate, setIsDuplicate] = useState(false);

	const onPressEnter = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		if (!inputValue?.length) {
			return;
		}

		if (!tree) {
			return;
		}

		let isDuplicate = false;

		const parseAndFindDuplicate = (treeData: DataNode[]) => {
			for (let i = 0; i < treeData.length; i++) {
				const node = treeData[i];

				const pathToCheck = `${path === TREE_ROOT_KEY ? `${path}/` : ""}${inputValue}/`;

				if (node.key.toString() === pathToCheck) {
					isDuplicate = true;
					return;
				}

				if (node.children) {
					parseAndFindDuplicate(node.children);
				}
			}
		};

		parseAndFindDuplicate(tree);

		if (isDuplicate) {
			setIsDuplicate(true);
			return;
		}

		const newTree = [...tree];

		const parseTreeAndUpdateNode = (treeData: DataNode[]) => {
			for (let i = 0; i < treeData.length; i++) {
				const node = treeData[i];

				if (node.key.toString().includes(TREE_TMP_KEY)) {
					const folderPath = `${path}${path === TREE_ROOT_KEY ? "/" : ""}${inputValue}/`;

					node.key = folderPath;
					node.title = inputValue;
					node.icon = <FolderOutlined />;
					node.isLeaf = true;
					node.children = [];

					return;
				}

				if (node.children) {
					parseTreeAndUpdateNode(node.children);
				}
			}
		};

		parseTreeAndUpdateNode(newTree);

		overrideTree(newTree);
	};

	const onCancel = async () => {
		const currentTree = await getTree();

		if (!currentTree) {
			return;
		}

		const newTree = currentTree.filter((node) => {
			return !node.key.toString().includes(TREE_TMP_KEY);
		});

		overrideTree(newTree);
	};

	const onFileNameKeyDown = async (
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === "Escape") {
			onCancel();
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		if (!inputValue.length || !tree) {
			return;
		}

		let isDuplicate = false;

		const parseAndFindDuplicate = (treeData: DataNode[]) => {
			for (let i = 0; i < treeData.length; i++) {
				const node = treeData[i];

				const pathToCheck = `${path === TREE_ROOT_KEY ? `${path}/` : ""}${inputValue}/`;

				if (node.key.toString() === pathToCheck) {
					isDuplicate = true;
				}

				if (node.children) {
					parseAndFindDuplicate(node.children);
				}
			}
		};

		parseAndFindDuplicate(tree);

		if (!isDuplicate) {
			setIsDuplicate(false);
			return;
		}

		setIsDuplicate(true);
	};

	return (
		<Flex align="center" gap={8}>
			<FolderOutlined />
			<Tooltip
				color="red"
				open={isDuplicate}
				placement="bottom"
				title={
					isDuplicate
						? "A folder with this name already exists at this location"
						: null
				}
			>
				<Input
					placeholder="Enter folder name"
					size="small"
					autoFocus
					onPressEnter={onPressEnter}
					onKeyDown={onFileNameKeyDown}
					onBlur={onCancel}
					onChange={onChange}
					status={isDuplicate ? "error" : undefined}
					suffix={<EnterOutlined />}
				/>
			</Tooltip>
		</Flex>
	);
}

export default NewFolderInput;
