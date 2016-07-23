/**
 * Created by nadavsinai on 23/7/16.
 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
require("rxjs/add/observable/fromEventPattern");
var rxjs_1 = require("rxjs");
var ObservableEvents = (function () {
    function ObservableEvents($element, renderer, eventToBind) {
        var _this = this;
        this.$element = $element;
        this.renderer = renderer;
        this.observableModel = {};
        this.eventsToBind = eventToBind.split(',');
        this.eventsToBind.forEach(function (v, i) {
            var teardown, listen = function (handler) {
                teardown = _this.renderer.listen(_this.$element.nativeElement, v, handler);
            };
            _this.observableModel[v] = rxjs_1.Observable.fromEventPattern(listen, function () { return teardown(); });
        });
        if (this.eventsToBind.length === 1) {
            return this.observableModel[this.eventsToBind[0]];
        }
        else {
            return this.observableModel;
        }
    }
    ObservableEvents = __decorate([
        core_1.Directive({
            selector: '[ObsEvents]',
            exportAs: "$"
        }),
        __param(2, core_1.Attribute('ObsEvents')), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, Object])
    ], ObservableEvents);
    return ObservableEvents;
}());
exports.ObservableEvents = ObservableEvents;
