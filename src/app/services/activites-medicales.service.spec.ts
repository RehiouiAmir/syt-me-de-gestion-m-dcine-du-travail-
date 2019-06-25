import { TestBed } from '@angular/core/testing';

import { ActivitesMedicalesService } from './activites-medicales.service';

describe('ActivitesMedicalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivitesMedicalesService = TestBed.get(ActivitesMedicalesService);
    expect(service).toBeTruthy();
  });
});
