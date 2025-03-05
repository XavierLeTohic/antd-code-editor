import { Flex } from "antd";
import Layout from "antd/lib/layout";
import type { FC } from "react";

const AntdEditorHeader: FC = () => {
	return (
		<Flex
			align="center"
			justify="space-between"
			style={{
				width: "100%",
				height: 48,
				background: "#ffffff",
				borderRadius: "4px 4px 0 0",
				borderBottom: "1px solid #e5dfdf",
				marginBottom: 0,
				paddingLeft: 8,
				paddingInlineStart: 8,
			}}
		>
			Header
		</Flex>
	);
};

export default AntdEditorHeader;
