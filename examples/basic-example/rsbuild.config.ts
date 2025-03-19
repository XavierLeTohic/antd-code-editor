import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	plugins: [pluginReact()],
	html: {
		title: "Antd Monaco Editor",
		template: "public/index.html",
	},
});
