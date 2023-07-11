import { TestBed } from '@angular/core/testing';

import { ReclamationTableService } from './reclamation-table.service';

describe('ReclamationTableService', () => {
  let service: ReclamationTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamationTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
