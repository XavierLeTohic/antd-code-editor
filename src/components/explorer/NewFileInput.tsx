import { EnterOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";

import { FileOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import type { DataNode } from "antd/lib/tree";
import { TREE_ROOT_KEY, TREE_TMP_KEY } from "constants/tree";
import { useTree } from "contexts/tree/TreeContext";
import { useState } from "react";

function NewFileInput({ path }: { path: string }) {
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

		const parseAndFindDuplicate = (
			treeData: DataNode[],
			parentNode: DataNode | null,
		) => {
			for (let i = 0; i < treeData.length; i++) {
				const node = treeData[i];

				let pathToCheck = `${path}${inputValue}`;

				if (!path.endsWith("/") && parentNode) {
					pathToCheck = `${parentNode?.key.toString()}${inputValue}`;
				}

				if (node.key.toString() === pathToCheck) {
					isDuplicate = true;
				}

				if (node.children) {
					parseAndFindDuplicate(node.children, node);
				}
			}
		};

		parseAndFindDuplicate(tree, null);

		if (isDuplicate) {
			setIsDuplicate(true);
			return;
		}

		const newTree = [...tree];

		const parseTreeAndUpdateNode = (treeData: DataNode[]) => {
			for (let i = 0; i < treeData.length; i++) {
				const node = treeData[i];

				if (node.key.toString().includes(TREE_TMP_KEY)) {
					node.key = `${path}${inputValue}`;
					node.title = inputValue;
					node.icon = <FileOutlined />;

					return;
				}

				if (node?.children) {
					parseTreeAndUpdateNode(node?.children);
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

		const parseAndFindDuplicate = (
			treeData: DataNode[],
			parentNode: DataNode | null,
		) => {
			for (let i = 0; i < treeData.length; i++) {
				const node = treeData[i];

				let pathToCheck = `${path}${inputValue}`;

				if (!path.endsWith("/") && parentNode) {
					pathToCheck = `${parentNode?.key.toString()}${inputValue}`;
				}

				if (node.key.toString() === pathToCheck) {
					isDuplicate = true;
				}

				if (node.children) {
					parseAndFindDuplicate(node.children, node);
				}
			}
		};

		parseAndFindDuplicate(tree, null);

		if (!isDuplicate) {
			setIsDuplicate(false);
			return;
		}

		setIsDuplicate(true);
	};

	return (
		<Flex align="center" gap={8}>
			<FileOutlined />
			<Tooltip
				color="red"
				open={isDuplicate}
				placement="bottom"
				title={
					isDuplicate
						? "A file with this name already exists at this location"
						: null
				}
			>
				<Input
					placeholder="Enter file name"
					size="small"
					onPressEnter={onPressEnter}
					onKeyDown={onFileNameKeyDown}
					onBlur={onCancel}
					onChange={onChange}
					status={isDuplicate ? "error" : undefined}
					suffix={<EnterOutlined />}
					autoFocus
				/>
			</Tooltip>
		</Flex>
	);
}

export default NewFileInput;
