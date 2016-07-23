/**
 * Created by nadavsinai on 23/7/16.
 */
import { ElementRef, Renderer } from "@angular/core";
import "rxjs/add/observable/fromEventPattern";
export declare class ObservableEvents {
    private $element;
    private renderer;
    $: any;
    private observableModel;
    eventsToBind: string[];
    constructor($element: ElementRef, renderer: Renderer, eventToBind: any);
}
