import { Splitter } from "antd";
import FileExplorer from "components/explorer";

export interface AntdSplitterLayoutProps {
	children: React.ReactNode;
}

function AntdSplitterLayout({ children }: AntdSplitterLayoutProps) {
	return (
		<Splitter style={{ height: "100%" }}>
			<Splitter.Panel
				defaultSize="25%"
				min="20%"
				max="70%"
				style={{ backgroundColor: "#f6f8fa" }}
			>
				<FileExplorer />
			</Splitter.Panel>
			<Splitter.Panel>{children}</Splitter.Panel>
		</Splitter>
	);
}

export default AntdSplitterLayout;
