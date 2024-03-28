import {AfterViewInit, Component, ViewChild} from '@angular/core'
import {NodeComponent} from "./node.component"

import { DEFAULT, AbsoluteLayout, Surface, AnchorLocations } from "@jsplumbtoolkit/browser-ui"
import {BrowserUIAngular, jsPlumbSurfaceComponent} from "@jsplumbtoolkit/browser-ui-angular"

@Component({
  selector: 'app-root-signals-integration',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title = 'angular-signals-integration';

  // @ts-ignore
  @ViewChild(jsPlumbSurfaceComponent) surfaceComponent:jsPlumbSurfaceComponent;

  surface!:Surface
  toolkit!:BrowserUIAngular

  view = {
    nodes:{
      [DEFAULT]:{
        component:NodeComponent
      }
    }
  }

  renderParams = {
    layout:{
      type:AbsoluteLayout.type
    },
    defaults:{
      anchor:AnchorLocations.Continuous
    }
  }

  ngAfterViewInit(): void {
    this.surface = this.surfaceComponent.surface
    this.toolkit = this.surface.toolkitInstance
    this.toolkit.load({
      data:{
        nodes:[
          { id:"1", name:"ONE", left:50, top:50, values:[1, 5, 89] },
          { id:"2", name:"TWO", left:350, top:150, values:[81, 85, 89] },
          { id:"3", name:"THREE", left:150, top:450, values:[31, 56, 123] },
        ],
        edges:[
          { source:"1", target:"2"},
          { source:"1", target:"3"}
        ]
      }
    })
  }

}
