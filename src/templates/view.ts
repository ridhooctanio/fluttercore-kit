import * as changeCase from "change-case";

export function getViewTemplate(viewName: string) {
    const viewNameToPascalCase = changeCase.pascalCase(viewName);
    const viewNameToSnakeCase = changeCase.snakeCase(viewName);
    const viewNameToKebabCase = changeCase.noCase(viewName).replaceAll(" ", "-");
    const screenVM = `${viewNameToPascalCase}ViewModel`;

    return `import 'package:flutter/material.dart';
import 'package:flutter_core/base/screen/core_screen.dart';

import '${viewNameToSnakeCase}_view_model.dart';

class ${viewNameToPascalCase}Screen extends CoreScreen<${screenVM}> {
    const ${viewNameToPascalCase}Screen({super.key});
    static const routeName = '/${viewNameToKebabCase}-screen';

    @override
    Widget buildScreen(BuildContext context) {
        return const Scaffold();
    }
}
`;
}