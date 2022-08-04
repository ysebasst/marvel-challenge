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
});
