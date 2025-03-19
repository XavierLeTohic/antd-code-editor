import Editor from "@monaco-editor/react";

import AntdEditorHeader from "components/header";
import AntdSplitterLayout from "components/layout/AntdSplitterLayout";
import { InMemoryPersister, PersisterProvider } from "contexts/persister";
import { TreeProvider } from "contexts/tree/TreeContext";

type AntdMonacoEditorProps = {
	persister?: "memory" | "fileSystem";
};

export const AntdMonacoEditor = ({
	persister = "memory",
}: AntdMonacoEditorProps) => {
	let initialPersister: InMemoryPersister | undefined;

	if (!persister || persister === "memory") {
		initialPersister = new InMemoryPersister();
	}

	return (
		<PersisterProvider initialPersister={initialPersister}>
			<TreeProvider>
				<AntdEditorHeader />
				<AntdSplitterLayout>
					<Editor
						height="100%"
						defaultLanguage="yaml"
						defaultValue="// some comment"
					/>
				</AntdSplitterLayout>
			</TreeProvider>
		</PersisterProvider>
	);
};
