---
title: Flutter equivalent to Reactjs componentDidMount method
hero: ./thumb.jpg
author: Vinny
date: '2020-01-25'
draft: false
lang: EN
tags:
  - Tips
  - Docker
  - CI
path: /blog/flutter-equivalent-to-reactjs-componentDidMount
---

> Runing nodemon in docker volume and app wont start ? this could be caused by
> dependencies from external machine.

###

According with the official guidelines and [sources](https://docs-flutter-io.firebaseapp.com/flutter/widgets/TextSelectionOverlay/update.html) if you want to be certain that also **the last frame of your layout** was drawned you can write for example:

```javascript
import 'package:flutter/scheduler.dart';


class MyState extends State<MyWidget>{

  @override
  Widget build(BuildContext context){
		return Container(...);
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance
        .addPostFrameCallback((_) => afterLayoutWidgetBuild());

  }

  void afterLayoutWidgetBuild() {
   // ... do something after draw first frame.
  }

}
```

Now your app will start without problems, if this are the cause of your problem.

\_ End of execution.

Good bye, until next post :P
