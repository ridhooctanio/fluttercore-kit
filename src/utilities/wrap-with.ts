import { commands, SnippetString, window } from "vscode";
import { getSelectedText } from "../utilities";

const interpolatedVarRegExp = new RegExp("\\$", "g");

export const wrapWith = async (snippet: (widget: string) => string) => {
    let editor = window.activeTextEditor;
    if (!editor) return;
    const selection = getSelectedText(editor);
    const widget = editor.document.getText(selection).replace(
        interpolatedVarRegExp,
        "\\$",
    );
    editor.insertSnippet(new SnippetString(snippet(widget)), selection);
    await commands.executeCommand("editor.action.formatDocument");
};
