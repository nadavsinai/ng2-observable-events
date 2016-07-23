/* tslint:disable:no-unused-variable */
import {async, inject} from '@angular/core/testing';

import {TestComponentBuilder} from '@angular/core/testing';

import {By}             from '@angular/platform-browser';
import {provide}        from '@angular/core';
import {ViewMetadata}   from '@angular/core';
import {PromiseWrapper} from '@angular/core/src/facade/promise';
import {Observable} from "rxjs/Rx";
import {AppComponent} from "../app.component";

////////  SPECS  /////////////


describe('ObservableEvent Directive', function () {

  it('should have expected Observable in clicks$',
    async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
      tcb.createAsync(AppComponent).then(fixture => {
        expect(fixture.componentInstance.click$ instanceof Observable).toBeTruthy()
      });
    })));
  it('should have expected Observables in moveHandler',
    async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
      tcb.createAsync(AppComponent).then(fixture => {
        for (let x in fixture.componentInstance.moveHandler) {
          if (fixture.componentInstance.moveHandler.hasOwnProperty(x)) {
            expect(fixture.componentInstance.moveHandler[x] instanceof Observable).toBeTruthy()
          }
        }
      });
    })));
  // it('should be possible to subscibe and unsubscribe clickHandler, which will remove the actual event listener',
  //todo
// })
// ))
})
