import { window, CodeAction, CodeActionProvider, CodeActionKind } from "vscode";
import { getSelectedText } from "../utilities";

export class KitCodeActionProvider implements CodeActionProvider {
    public provideCodeActions(): CodeAction[] {
        const editor = window.activeTextEditor;
        if (!editor) return [];

        const selectedText = editor.document.getText(getSelectedText(editor));
        if (selectedText === "") return [];

        return [
            {
                command: "extension.wrap-collect",
                title: "FlutterCore-KIT: Wrap with Collect",
            }
        ].map((c) => {
            let action = new CodeAction(c.title, CodeActionKind.Refactor);
            action.command = {
                command: c.command,
                title: c.title,
            };
            return action;
        });
    }
}
