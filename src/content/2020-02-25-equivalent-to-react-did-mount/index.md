---
title: Flutter equivalent to Reactjs componentDidMount method
author: Vinny
date: '2020-01-25'
draft: false
lang: EN
tags:
  - Tips
  - Flutter
  - Dart
path: /blog/flutter-equivalent-to-reactjs-componentDidMount
---



> Arrived in flutter coming from react ? want something like `componentDidMount()` function to call your method on first draw to the screen ? this could be help you.

# Flutter equivalent to Reactjs componentDidMount

According with the official guidelines and [sources](https://docs-flutter-io.firebaseapp.com/flutter/widgets/TextSelectionOverlay/update.html) if you want to be certain that also **the last frame of your layout** was drawed you can write for example:

```dart
import 'package:flutter/scheduler.dart';

// class MyWidget extends StatefulWidget...

class MyState extends State<MyWidget>{
    @override
    void initState() {
        super.initState();
        if (SchedulerBinding.instance.schedulerPhase == SchedulerPhase.persistentCallbacks) {
            SchedulerBinding.instance.addPostFrameCallback((_) => afterLayoutWidgetBuild(context));
        }
    }
    /// Called After First Frame Draw
    void afterLayoutWidgetBuild(context) async {
        // ... fetch some data from web, do some async stuff.
    }
    @override
    Widget build(BuildContext context){
        return Container( child: Text("Your Amazing Interface") );
    }
}
```



Now, with the above code, the application will simply execute `afterLayoutWidgetBuild` passing the context only after the first frame is drawn on the screen, this can be useful in interface iterations that need the widget context only after the first frame, or as I used it sometimes, to call `Actions` that modify` Stores`,  i hope that could help you

`$ End of execution`