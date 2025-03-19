import { Flex, Typography } from "antd";

const { Text } = Typography;

function EditorHeader() {
	return (
		<Flex
			align="center"
			justify="center"
			style={{
				width: "100%",
				height: 27,
				background: "#f6f8fa",
				borderBottom: "1px solid #e5dfdf",
			}}
		>
			<Text type="secondary">Antd Monaco Editor</Text>
		</Flex>
	);
}

export default EditorHeader;
