# AngularSignalsIntegration

This is a demonstration of how to use Signals from Angular 16 with the current version of JsPlumb Toolkit (at the time of writing this is 6.17.0, and this repository is setup to require 6.17.0, because that's the version we have tested this with, but there seems little reason to think this will not work with any 6.x version of JsPlumb).

You'll need to be JsPlumb licensee or [evaluator](https://jsplumbtoolkit.com/trial) to run this app.


## Setup

### package.json

JsPlumb is added to the `dependencies`:

```javascript
"dependencies":{
  
  ...
  "@jsplumbtoolkit/browser-ui-angular": "^6.17.0",
  ...
  
}

```

### Module import

This is an Angular 16 app which uses JsPlumb, so the JsPlumb module is imported in `app.module.ts`:

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NodeComponent} from "./node.component"
import {jsPlumbToolkitModule} from "@jsplumbtoolkit/browser-ui-angular"

@NgModule({
  declarations: [
    AppComponent, NodeComponent
  ],
  imports: [
    BrowserModule, jsPlumbToolkitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### Node component

Notice above the `NodeComponent` in the `declarations` list - that's the component we use to render each node.  We map it inside our `view` in `app.component.ts`:

```javascript
  view = {
    nodes:{
      [DEFAULT]:{
        component:NodeComponent
      }
    }
  }
```

Take a look inside `node.component.ts` to see the code used to integrate with signals.  


## Further reading

Documentation on JsPlumb's Angular integration can be found here: [https://docs.jsplumbtoolkit.com/toolkit/6.x/lib/angular-integration](https://docs.jsplumbtoolkit.com/toolkit/6.x/lib/angular-integration)


