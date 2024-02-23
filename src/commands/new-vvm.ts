import _ from "lodash";
import * as changeCase from "change-case";

import { showInputBox, getTargetDirectory, generateVVMFile } from "../utilities";
import { Uri, window } from "vscode";
import { lstatSync } from "fs";

export const newVVM = async (uri: Uri) => {
    const vvmName = await showInputBox();
    if (_.isNil(vvmName) || vvmName.trim() === "") {
        window.showErrorMessage("The VVM name cannot be empty");
        return;
    }

    let targetDirectory: string | undefined;
    if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = await getTargetDirectory();
        if (_.isNil(targetDirectory)) {
            window.showErrorMessage("Directory is invalid");
            return;
        }
    } else {
        targetDirectory = uri.fsPath;
    }

    const vvmNameToPascalCase = changeCase.pascalCase(vvmName);
    try {
        await generateVVMFile(vvmName, targetDirectory, false);
        window.showInformationMessage(
            `Successfully Created ${vvmNameToPascalCase} VVM`
        );
    } catch (error) {
        window.showErrorMessage(
            `Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`
        );
    }
};

export const newVVMWithFolder = async (uri: Uri) => {
    const vvmName = await showInputBox();
    if (_.isNil(vvmName) || vvmName.trim() === "") {
        window.showErrorMessage("The VVM name cannot be empty");
        return;
    }

    let targetDirectory;
    if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = await getTargetDirectory();
        if (_.isNil(targetDirectory)) {
            window.showErrorMessage("Directory is Invalid");
            return;
        }
    } else {
        targetDirectory = uri.fsPath;
    }

    const vvmNameToPascalCase = changeCase.pascalCase(vvmName);
    try {
        await generateVVMFile(vvmName, targetDirectory, true);
        window.showInformationMessage(
            `Successfully Created ${vvmNameToPascalCase} VVM`
        );
    } catch (error) {
        window.showErrorMessage(
            `Error:
          ${error instanceof Error ? error.message : JSON.stringify(error)}`
        );
    }
};