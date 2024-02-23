import _ from "lodash";
import * as changeCase from "change-case";

import { window } from "vscode";
import { existsSync, mkdir, writeFile } from "fs";
import { getViewTemplate, getVMTemplate } from "../templates";

export function showInputBox(): Thenable<string | undefined> {
    return window.showInputBox({
        prompt: "VVM Name",
        placeHolder: "Hello World",
    });
}

export async function getTargetDirectory(): Promise<string | undefined> {
    return window.showOpenDialog({
        canSelectMany: false,
        canSelectFolders: true,
        openLabel: "Select a folder to create the VVM in",
    }).then((uri) => {
        if (_.isNil(uri) || _.isEmpty(uri)) {
            return undefined;
        }
        return uri[0].fsPath;
    });
}

export async function generateVVMFile(
    vvmName: string,
    targetDirectory: string,
    shouldCreateDirectory: boolean,
) {
    const vvmNameToSnakeCase = changeCase.snakeCase(vvmName);
    const vvmDirectoryPath = shouldCreateDirectory
        ? `${targetDirectory}/${vvmNameToSnakeCase}`
        : targetDirectory;
    if (!existsSync(vvmDirectoryPath)) {
        await createDirectory(vvmDirectoryPath);
    }

    await Promise.all([
        createViewWithTemplate(vvmName, vvmDirectoryPath),
        createVMWithTemplate(vvmName, vvmDirectoryPath),
    ]);
}

function createDirectory(targetDirectory: string): Promise<void> {
    return new Promise((resolve, reject) => {
        mkdir(targetDirectory, (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        })
    });
}

function createViewWithTemplate(
    vvmName: string,
    targetDirectory: string,
) {
    const snakeCasevvmName = changeCase.snakeCase(vvmName);
    const targetPath = `${targetDirectory}/${snakeCasevvmName}_screen.dart`;
    if (existsSync(targetPath)) {
        throw Error(`${snakeCasevvmName}_screen.dart already exists`);
    }
    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getViewTemplate(vvmName),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });
}

function createVMWithTemplate(
    vvmName: string,
    targetDirectory: string,
) {
    const snakeCasevvmName = changeCase.snakeCase(vvmName);
    const targetPath = `${targetDirectory}/${snakeCasevvmName}_view_model.dart`;
    if (existsSync(targetPath)) {
        throw Error(`${snakeCasevvmName}_view_model.dart already exists`);
    }
    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getVMTemplate(vvmName),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });
}