import { EnterOutlined, FolderOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";

import { FileOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { TREE_TMP_KEY } from "constants/tree";
import { useTree } from "contexts/tree/TreeContext";
import { useState } from "react";

function NewFolderInput() {
	const { tree, refresh, getTree, overrideTree } = useTree();
	const [isDuplicate, setIsDuplicate] = useState(false);

	const onPressEnter = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		if (!inputValue?.length) {
			return;
		}

		const currentTree = await getTree();

		if (!currentTree) {
			return;
		}

		const isDuplicate = currentTree.some((node) => {
			return node.key.toString() === inputValue;
		});

		if (isDuplicate) {
			setIsDuplicate(true);
			return;
		}

		const newTree = currentTree.map((node) => {
			if (node.key.toString().includes(TREE_TMP_KEY)) {
				return {
					...node,
					key: inputValue,
					title: inputValue,
					icon: <FolderOutlined />,
					isLeaf: false,
					children: [],
				};
			}
			return node;
		});

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

		const isDuplicate = tree.some((node) => {
			return node.key === inputValue;
		});

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
