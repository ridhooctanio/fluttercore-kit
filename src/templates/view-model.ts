import * as changeCase from "change-case";

export function getVMTemplate(vmName: string) {
    const vmNameToPascalCase = changeCase.pascalCase(vmName);

    return `import 'package:flutter_core/base/viewmodel/core_view_model.dart';

class ${vmNameToPascalCase}ViewModel extends CoreViewModel {
    
}
`;
}