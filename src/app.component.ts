import {Component, ViewChild, AfterViewInit, ElementRef} from "@angular/core";
import {ObservableEvents} from "./lib/observable.events.directive";
import {Observable, Subscription} from "rxjs/Rx";

@Component({
  selector  : 'my-app',
  directives: [ObservableEvents],
  styles    : [`.container{margin: 40px 0;} 
.box {width:100px;height:100px;background: red;position: absolute;}`],
  template  : `<h1>ObservableEvents Demo</h1>

<button (click)="toggleClickListener();">Toggle Click listener</button>
<button (click)="toggleMoveListener();">Toggle Move listener</button>
<div class="container">
    <button ObsEvents="click" id='clickBtn' #clicks="$">Click Me</button>
    <span> click count<i>{{clickCount}}</i></span>
    </div>
<div class="container">
    <div class='box' #box="" ObsEvents="mouseup,mousedown,mousemove" #moveHandler="$"></div>
</div>
`
})
export class AppComponent implements AfterViewInit {
  @ViewChild('clicks') click$:Observable<any>;
  @ViewChild('moveHandler') moveHandler:any; // {[I:string]:Observable<MouseEvent>}; typeing didn't work for me.
  @ViewChild('box') box:ElementRef;
  subscribedToClicks:Subscription;
  subscribedToDrags:Subscription;
  private clickCount = 0;
  private mousedrag:Observable<any>;

  private handleClick(e) {
    this.clickCount++;
    console.log(e);
  }

  private toggleClickListener() {
    if (this.subscribedToClicks) {
      this.subscribedToClicks.unsubscribe();
      this.subscribedToClicks = undefined;
    } else {
      this.subscribedToClicks = this.click$.subscribe(this.handleClick.bind(this));
    }

  }

  private toggleMoveListener() {
    if (this.subscribedToDrags) {
      this.subscribedToDrags.unsubscribe();
      this.subscribedToDrags = undefined;
    } else {
      this.subscribedToDrags = this.mousedrag.subscribe((pos)=> {
        this.box.nativeElement.style.top = pos.top + 'px';
        this.box.nativeElement.style.left = pos.left + 'px';
      });

    }

  }

  ngAfterViewInit() {
    this.toggleClickListener();
    this.setupMouseDrag();

  }

  setupMouseDrag() {
    this.mousedrag = this.moveHandler.mousedown.flatMap((md:MouseEvent)=> {
      let startX = md.offsetX, startY = md.offsetY;
      return this.moveHandler.mousemove.map((mm)=> {
        mm.preventDefault();
        return {
          left: mm.clientX - startX,
          top : mm.clientY - startY
        };
      }).takeUntil(this.moveHandler.mouseup);
    });
  }
}
