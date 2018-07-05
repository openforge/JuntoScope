import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { ConnectionListComponent } from './connection-list.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConnectionListComponent', () => {
  let component: ConnectionListComponent;
  let fixture: ComponentFixture<ConnectionListComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a list of connections', () => {
    component.connections = [
      {
        id: '3snjsjs',
        type: 'test connection type',
        token: '382idnsjs',
        externalData: { company: 'OpenForge' },
        projects: {},
      },

      {
        id: '883838',
        type: 'test connection type 1',
        token: '382idnsjs',
        externalData: { company: 'OpenForge' },
        projects: {},
      },
    ];

    fixture.detectChanges();

    spyOn(component.select, 'emit');

    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);

    expect(component.select.emit).toHaveBeenCalledWith(component.connections);

    component.select.subscribe(e => {
      console.log('in subscribe');
      console.log('e from subscribe', e);
      expect(e).toEqual(component.connections);
    });
  });
});
