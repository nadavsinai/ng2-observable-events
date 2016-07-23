# Observable Events Directive

Angular 2 pushes the developer towards observable "stream" programming. 
This is modeled very nicely for state changes using inputs and the async pipe.
However getting dom events observables is a bit cumbersome if done right,I made this little helper to make it a little easier.

It is easy to use [Rx.Observable.fromEvent](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromEvent) constructor somewhere in your component code, 
however this will be against angular 2 paradigm of not accessing the DOM directly as for the first paramter you will need reference to a native DOM element.

My code uses [Rx.Observable.fromEventPattern](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromEventPattern), utilizing the renderer .listen method
 which goes though all the abstraction needed for both the webWorker and server use cases as well as the obvious browser use case.
 
 
##Use

- Add the exported ObservableEvents directive class to your directives array in your component or below it.
- use the ObsEvents='' attribute selector on the dom element you would like to monitor, the value should be the event type (without the "on") eg : ObsEvents="click"
- If you need more than one event observable you can separate multiple event names with a comma eg : ObsEvents="mousemove,mouseup,mousedown" 
- add a local template variable to the DOM node - #myObs='$' , the part that's set here is the $ in the value's place, myObs is just an example
- use @ViewChild('myObs') to recieve the exported observable to your component's class, remember it is only available after ngAfterViewInit hook has been called.
- If You have asked for more than one observable, the resulting export would be of a hash with the event name as the key and the observable as value, else the export is the observable itself 
example code in src folder



