import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesConfigComponent } from './fees-config.component';

describe('FeesConfigComponent', () => {
  let component: FeesConfigComponent;
  let fixture: ComponentFixture<FeesConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
