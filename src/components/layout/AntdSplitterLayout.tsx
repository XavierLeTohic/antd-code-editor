import { Splitter } from "antd";
import FileExplorer from "components/FileExplorer";

export interface AntdSplitterLayoutProps {
	children: React.ReactNode;
}

function AntdSplitterLayout({ children }: AntdSplitterLayoutProps) {
	return (
		<Splitter style={{ height: "100%" }}>
			<Splitter.Panel defaultSize="40%" min="20%" max="70%">
				<FileExplorer />
			</Splitter.Panel>
			<Splitter.Panel>{children}</Splitter.Panel>
		</Splitter>
	);
}

export default AntdSplitterLayout;
