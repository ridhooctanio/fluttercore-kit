# FlutterCore-KIT
An extension to support [FlutterCore](https://github.com/yzzzd/fluttercore) that will make the process of creating View (Screen) and View Model faster and easier.

## Getting started
First thing to do is to ensure that your Flutter project is already using the FlutterCore dependency. If not, you can [add](https://github.com/yzzzd/fluttercore?tab=readme-ov-file#getting-started) it first.

After that you can install FlutterCore-KIT on VSCode here: [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ridhooctanio.fluttercore-kit)

## Usage
### Methode 1
1) Right click on your directory
2) Select `FlutterCore-KIT: New View (Screen) + VM` to create View (Screen) and ViewModel
3) Select `FlutterCore-KIT: New View (Screen) + VM With Folder` to create View (Screen) and ViewModel inside Folder

### Methode 2
1) Open Command Pallete (`CMD + Shift + P` for MacOS and `Ctrl + Shift + P` for Windows)
2) Find or type `FlutterCore-KIT: New View (Screen) + VM` to create View (Screen) and ViewModel
3) Find or type `FlutterCore-KIT: New View (Screen) + VM With Folder` to create View (Screen) and ViewModel inside Folder

Note: The folder name, view (screen), and ViewModel will automatically adjust according to the name you write when creating the VVM.

## Example Result
### View (Screen)
```dart
import 'package:flutter/material.dart';
import 'package:flutter_core/base/screen/core_screen.dart';

import 'hallo_world_view_model.dart';

class HalloWorldScreen extends CoreScreen<HalloWorldViewModel> {
    const HalloWorldScreen({super.key});
    static const routeName = '/hallo-world-screen';

    @override
    Widget buildScreen(BuildContext context) {
        return Scaffold();
    }
}
```
### ViewModel
```dart
import 'package:flutter_core/base/viewmodel/core_view_model.dart';

class HalloWorldViewModel extends CoreViewModel {
    
}
```

## Changelog
You can check it here [CHANGELOG.md](CHANGELOG.md).

## Special Thanks
- [@yzzzd](https://github.com/yzzzd). The creator of FlutterCore, who has inspired me to create this extension to support FlutterCore.
- [@felangel](https://github.com/felangel). The creator of Bloc, which I used as a reference for creating this extension.