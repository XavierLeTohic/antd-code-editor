import {
	FileAddOutlined,
	FolderAddOutlined,
	FolderOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
import {
	Button,
	Divider,
	Dropdown,
	Flex,
	type GetRef,
	type MenuProps,
	Tooltip,
	type Tree,
	Typography,
} from "antd";
import type { DataNode, EventDataNode, TreeProps } from "antd/lib/tree";
import DirectoryTree from "antd/lib/tree/DirectoryTree";
import { TREE_ROOT_KEY, TREE_TMP_KEY } from "constants/tree";
import { usePersister } from "contexts/persister";
import { useTree } from "contexts/tree/TreeContext";
import { type Key, useRef, useState } from "react";

const { Text, Title } = Typography;

function FileExplorer() {
	const { tree, addFile, addDirectory, refresh } = useTree();
	const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
	const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
	const treeRef = useRef(null);

	const [selectedNode, setSelectedNode] =
		useState<EventDataNode<DataNode> | null>(null);

	const onAddFile = async (path = TREE_ROOT_KEY) => {
		// Do nothing if multiple nodes are selected
		if (selectedKeys.length > 1) {
			return;
		}

		if (selectedKeys.length === 1) {
			await addFile(selectedKeys[0].toString());
		} else {
			await addFile(path);
		}

		refresh();
	};

	const onAddFolder = async (path = TREE_ROOT_KEY) => {
		console.log("selectedKeys", selectedKeys);

		// Do nothing if multiple nodes are selected
		if (selectedKeys.length > 1) {
			return;
		}

		if (selectedKeys.length === 1) {
			await addDirectory(selectedKeys[0].toString());
		} else {
			await addDirectory(path);
		}

		refresh();
	};

	const contextMenuItems: MenuProps["items"] = [
		{
			key: "new-folder",
			label: "New Folder",
			icon: <FolderOutlined />,
			onClick: async () => {
				if (!selectedNode) return;

				await onAddFolder(selectedNode.key.toString());

				// Expland the new folder to display the input to set the name
				if (treeRef.current) {
					setExpandedKeys((prevState) => [...prevState, selectedNode.key]);
				}
			},
		},
	];

	const onSelectNodes: TreeProps["onSelect"] = (selectedKeys, info) => {
		setSelectedKeys(selectedKeys);
	};

	const onRightClick: TreeProps["onRightClick"] = ({ node }) => {
		setSelectedNode(node);
	};

	const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
		setExpandedKeys(expandedKeysValue);
	};

	return (
		<>
			<Flex justify="space-between" align="center">
				<div style={{ margin: "0 8px" }}>
					<Title
						level={5}
						style={{ whiteSpace: "nowrap", padding: 0, margin: 0 }}
					>
						Project
					</Title>
				</div>
				<div>
					<Tooltip title="New file...">
						<Button
							icon={<FileAddOutlined />}
							onClick={() => onAddFile(TREE_ROOT_KEY)}
							type="text"
							alt="Add file"
						/>
					</Tooltip>
					<Tooltip title="New folder...">
						<Button
							icon={<FolderAddOutlined />}
							onClick={() => onAddFolder(TREE_ROOT_KEY)}
							type="text"
							alt="Add folder"
						/>
					</Tooltip>
					<Tooltip title="Refresh explorer...">
						<Button
							icon={<ReloadOutlined />}
							type="text"
							alt="Refresh explorer"
						/>
					</Tooltip>
				</div>
			</Flex>
			<Divider style={{ margin: 0 }} />
			<Dropdown menu={{ items: contextMenuItems }} trigger={["contextMenu"]}>
				<DirectoryTree
					treeData={tree}
					ref={treeRef}
					defaultExpandAll
					expandedKeys={expandedKeys}
					onSelect={onSelectNodes}
					onRightClick={onRightClick as any}
					onExpand={onExpand}
					draggable={{ icon: false }}
					style={{ backgroundColor: "transparent" }}
					rootStyle={{ backgroundColor: "transparent" }}
					showLine
				/>
			</Dropdown>
		</>
	);
}

export default FileExplorer;
