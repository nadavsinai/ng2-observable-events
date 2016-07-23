"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var observable_events_directive_1 = require("./lib/observable.events.directive");
var Rx_1 = require("rxjs/Rx");
var AppComponent = (function () {
    function AppComponent() {
        this.clickCount = 0;
    }
    AppComponent.prototype.handleClick = function (e) {
        this.clickCount++;
        console.log(e);
    };
    AppComponent.prototype.toggleClickListener = function () {
        if (this.subscribedToClicks) {
            this.subscribedToClicks.unsubscribe();
            this.subscribedToClicks = undefined;
        }
        else {
            this.subscribedToClicks = this.click$.subscribe(this.handleClick.bind(this));
        }
    };
    AppComponent.prototype.toggleMoveListener = function () {
        var _this = this;
        if (this.subscribedToDrags) {
            this.subscribedToDrags.unsubscribe();
            this.subscribedToDrags = undefined;
        }
        else {
            this.subscribedToDrags = this.mousedrag.subscribe(function (pos) {
                _this.box.nativeElement.style.top = pos.top + 'px';
                _this.box.nativeElement.style.left = pos.left + 'px';
            });
        }
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.toggleClickListener();
        this.setupMouseDrag();
    };
    AppComponent.prototype.setupMouseDrag = function () {
        var _this = this;
        this.mousedrag = this.moveHandler.mousedown.flatMap(function (md) {
            var startX = md.offsetX, startY = md.offsetY;
            return _this.moveHandler.mousemove.map(function (mm) {
                mm.preventDefault();
                return {
                    left: mm.clientX - startX,
                    top: mm.clientY - startY
                };
            }).takeUntil(_this.moveHandler.mouseup);
        });
    };
    __decorate([
        core_1.ViewChild('clicks'), 
        __metadata('design:type', Rx_1.Observable)
    ], AppComponent.prototype, "click$", void 0);
    __decorate([
        core_1.ViewChild('moveHandler'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "moveHandler", void 0);
    __decorate([
        // {[I:string]:Observable<MouseEvent>}; typeing didn't work for me.
        core_1.ViewChild('box'), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "box", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            directives: [observable_events_directive_1.ObservableEvents],
            styles: [".container{margin: 40px 0;} \n.box {width:100px;height:100px;background: red;position: absolute;}"],
            template: "<h1>ObservableEvents Demo</h1>\n\n<button (click)=\"toggleClickListener();\">Toggle Click listener</button>\n<button (click)=\"toggleMoveListener();\">Toggle Move listener</button>\n<div class=\"container\">\n    <button ObsEvents=\"click\" id='clickBtn' #clicks=\"$\">Click Me</button>\n    <span> click count<i>{{clickCount}}</i></span>\n    </div>\n<div class=\"container\">\n    <div class='box' #box=\"\" ObsEvents=\"mouseup,mousedown,mousemove\" #moveHandler=\"$\"></div>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map