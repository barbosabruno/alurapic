import { TokenService } from './token.service';

describe('TokenService', () => {

  let token: string;
  let service: TokenService;

  beforeEach(() => {
    token = 'somevalue';
    service = new TokenService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be instantiate', () => {
    expect(service).toBeTruthy();
  });

  it('should store a token', () => {
    service.setToken(token);
    expect(service.hasToken()).toBeTruthy();
    expect(service.getToken()).toBe('somevalue');
  });

  it('should remove a token', () => {
    service.setToken(token);
    service.removeToken();
    expect(service.hasToken()).toBeFalsy();
    expect(service.getToken()).toBeFalsy();
  });

});
