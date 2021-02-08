import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";

describe('UserService', () => {

  let token: string;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });

    userService = TestBed.get(UserService);

    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTYxMjc0NjYyNSwiZXhwIjoxNjEyODMzMDI1fQ.jihn1QqlKC1_r1n3Gvrkzf_U3WKMKKw-qraOEr0q4QI';
  });

  it('should be instantiate', () => {
    expect(userService).toBeTruthy();
  });

  it('should get user info by a token', () => {

    userService.setToken(token);

    expect(userService.isLogged()).toBeTruthy;
    expect(userService.getUserName()).toBe('flavio');

    userService.getUser().subscribe(user => {
      expect(user.name).toBe('flavio');
    });

  });

  it('should logout and clear user info', () => {

    userService.setToken(token);
    userService.logout();

    expect(userService.isLogged()).toBeFalsy;
    expect(userService.getUserName()).toBeFalsy;
  });

});
