import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbiondiComponent } from './fbiondi.component';

describe('FbiondiComponent', () => {
  let component: FbiondiComponent;
  let fixture: ComponentFixture<FbiondiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbiondiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbiondiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
