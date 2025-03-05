import {
	FileAddOutlined,
	FolderAddOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex, Tooltip, Typography } from "antd";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import { usePersister } from "contexts/persister";
import { useTree } from "contexts/tree/TreeContext";

const { Text } = Typography;

function FileExplorer() {
	const { tree, addFile, refresh } = useTree();

	console.log("render", tree);

	const onAddFile = async () => {
		console.log("add file");

		await addFile("test.txt");

		refresh();
	};

	const onAddFolder = () => {
		console.log("add folder");
	};

	return (
		<>
			<Flex justify="space-between" align="center">
				<div style={{ margin: "0 8px" }}>
					<Text style={{ whiteSpace: "nowrap" }} strong>
						Files
					</Text>
				</div>
				<div>
					<Tooltip title="New file...">
						<Button
							icon={<FileAddOutlined />}
							onClick={onAddFile}
							type="text"
							alt="Add file"
						/>
					</Tooltip>
					<Tooltip title="New folder...">
						<Button
							icon={<FolderAddOutlined />}
							onClick={onAddFolder}
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
			<DirectoryTree treeData={tree} multiple draggable defaultExpandAll />
		</>
	);
}

export default FileExplorer;
