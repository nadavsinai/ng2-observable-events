/**
 * Created by nadavsinai on 23/7/16.
 */

import {Directive, ElementRef, Renderer, Attribute} from "@angular/core";
import "rxjs/add/observable/fromEventPattern";
import {Observable} from "rxjs";
@Directive({
  selector: '[ObsEvents]',
  exportAs: "$"
})
export class ObservableEvents {
  $:any;
  private observableModel = {};
  eventsToBind:string[];

  constructor(private $element:ElementRef, private renderer:Renderer, @Attribute('ObsEvents')  eventToBind) {
    this.eventsToBind = eventToBind.split(',');

    this.eventsToBind.forEach((v, i)=> {
      let teardown:Function, listen = (handler:Function)=> {
        teardown = this.renderer.listen(this.$element.nativeElement, v, handler)
      };
      this.observableModel[v] = Observable.fromEventPattern(listen, ()=>teardown());
    });

    if (this.eventsToBind.length === 1) {
      return <ObservableEvents> this.observableModel[this.eventsToBind[0]]
    }
    else {
      return <ObservableEvents> this.observableModel;
    }
  }
}
