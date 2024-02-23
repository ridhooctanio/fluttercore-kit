import * as yaml from "js-yaml";
import _ from "lodash";

import { commands, Uri, workspace } from "vscode";

export async function setShowContextMenu(
    pubspec?: Uri | undefined,
): Promise<void> {
    async function pubspecIncludesFlutterCoreVVM(pubspec: Uri): Promise<boolean> {
        try {
            const content = await workspace.fs.readFile(pubspec);
            const yamlContent = yaml.load(content.toString());
            const dependencies = _.get(yamlContent, "dependencies", {});
            return [
                "flutter_core",
            ].some((d) => dependencies.hasOwnProperty(d));
        } catch (_) { }
        return false;
    }

    async function workspaceIncludesFlutterCoreVVM(): Promise<boolean> {
        try {
            const pubspecs = await workspace.findFiles("**/**/pubspec.yaml");
            for (const pubspec of pubspecs) {
                if (await pubspecIncludesFlutterCoreVVM(pubspec)) {
                    return true;
                }
            }
        } catch (_) { }
        return false;
    }

    commands.executeCommand(
        "setContext",
        "fluttercore-kit.showContextMenu",
        pubspec
            ? await pubspecIncludesFlutterCoreVVM(pubspec)
            : await workspaceIncludesFlutterCoreVVM(),
    );
}
