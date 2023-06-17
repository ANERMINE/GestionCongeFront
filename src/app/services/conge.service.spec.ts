/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CongeService } from './conge.service';

describe('Service: Conge', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CongeService]
    });
  });

  it('should ...', inject([CongeService], (service: CongeService) => {
    expect(service).toBeTruthy();
  }));
});
