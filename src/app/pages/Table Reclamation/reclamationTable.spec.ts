import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationTable } from './reclamationTable';

describe('TablesComponent', () => {
  let component: ReclamationTable;
  let fixture: ComponentFixture<ReclamationTable>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamationTable ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
