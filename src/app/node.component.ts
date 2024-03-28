import { signal, computed, OnInit, Component } from "@angular/core"
import { Node, EVENT_NODE_UPDATED } from "@jsplumbtoolkit/browser-ui"
import { BaseNodeComponent } from "@jsplumbtoolkit/browser-ui-angular"

interface MyDataObject {
  name:string
  values:Array<number>
}

@Component({
  template:`<div class="jtk-signals-node" style="display: flex;flex-direction: column;">
              <div class="jtk-signals-delete" (click)="this.removeNode()"></div>
              <div>{{obj['name']}}</div>
              <div>{{valueList()}}</div>
              <button (click)="addValue()" style="margin-top:0.5rem">Add a value</button>
          </div>`
})
export class NodeComponent extends BaseNodeComponent implements OnInit {

  //
  // Declare a signal at the component level, and give it type (which is optional - you could use ObjectData, JsPlumb's default,
  // or you could of course also use `any`...but we didn't suggest that!)
  //
  readonly objSignal = signal<MyDataObject>(undefined!);

  //
  // This is a computed value which will be updated whenever `objSignal` gets updated. Here we concat the list of values
  // in this node to a comma delimited string.
  //
  readonly valueList = computed( () =>
    this.objSignal().values.join(",")
  );

  //
  // Declare a class-level handler for JsPlumb's node update event.  This is necessary in order to maintain the `this`
  // reference correctly, and to be able to unbind the handler when this component is destroyed.
  //
  private _signalBinder!:(params:{vertex:Node}) => any

  //
  // Listens for an update event on the Toolkit. When the updated vertex's ID matches this component's vertex's id, we
  // set a new value on `objSignal`.
  //
  private _signalBinding(n:{vertex:Node}) {
    if (n.vertex.id === this.obj['id']) {
      console.log(`Updating signal binder for vertex ${this.obj['id']}`)
      this.objSignal.set(this.obj as MyDataObject)
    }
  }

  //
  // In the init method we do three things:
  //
  // 1. Set the initial value on our signal
  // 2. Store a reference to our update handler to a function bound to this class.
  // 3. Register our bound handler on the Toolkit to listen for updates to this vertex
  //
  ngOnInit() {
    this.objSignal.set(this.obj as MyDataObject);
    this._signalBinder = this._signalBinding.bind(this)
    this.toolkit.bind(EVENT_NODE_UPDATED, this._signalBinder)
  }

  //
  // When the component is destroyed, unbind the update listener.
  //
  override ngOnDestroy() {
    console.log(`Destroy - unbinding signal binder for vertex ${this.obj['id']}`)
    this.toolkit.unbind(EVENT_NODE_UPDATED, this._signalBinder)
    super.ngOnDestroy()
  }

  //
  // When the user clicks Add a value, add a new value to the vertex's `values` array and update the object in the Toolkit.
  // Our update listener will pick this up and update the signal, and Angular will handle the rest.
  //
  addValue() {
    const newValues = this.obj['values'].slice()
    newValues.push(Math.floor(Math.random() * 150))
    this.updateNode({
      values:newValues
    })
  }


}
