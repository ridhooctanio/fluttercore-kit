import { commands, ExtensionContext, languages, window, workspace } from "vscode";
import { newVVM, newVVMWithFolder } from "./commands";
import { setShowContextMenu } from "./utilities";
import { wrapWithCollect } from "./commands/wrap";
import { KitCodeActionProvider } from "./code-actions/kit-code-action-provider";

const DART_MODE = { language: "dart", scheme: "file" };

export function activate(context: ExtensionContext) {
	setShowContextMenu();

	context.subscriptions.push(
		window.onDidChangeActiveTextEditor((_) => setShowContextMenu()),
		workspace.onDidChangeWorkspaceFolders((_) => setShowContextMenu()),
		workspace.onDidChangeTextDocument((_) => setShowContextMenu()),
		commands.registerCommand("extension.new-vvm", newVVM),
		commands.registerCommand("extension.new-vvm-with-folder", newVVMWithFolder),
		commands.registerCommand("extension.wrap-collect", wrapWithCollect),
		languages.registerCodeActionsProvider(
			DART_MODE,
			new KitCodeActionProvider(),
		),
	);
}

export function deactivate() { }