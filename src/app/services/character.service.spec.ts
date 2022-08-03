import { of } from 'rxjs';
import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: CharacterService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CharacterService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get characters of the API', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of({}));
    service.get();
    service.data$.subscribe((result) => {
      expect(result).toEqual({});
      done();
    });
  });
});
