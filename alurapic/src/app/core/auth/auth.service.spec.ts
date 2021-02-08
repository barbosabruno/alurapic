import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

describe('AuthService', () => {

  let authService: AuthService;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  it('should be instantiate', () => {
    expect(authService).toBeTruthy;
  });

  it('should authenticate user', fakeAsync(() => {
    const fakeBody = {
      id: 1,
      name: 'bruno',
      email: 'bruno@email.com'
    };

    const spy = spyOn(userService, 'setToken')
      .and
      .returnValue(null);

    authService.authenticate('bruno', '12345678')
    .subscribe(res => {
      expect(res.body).toEqual(fakeBody);
      expect(spy).toHaveBeenCalledWith('tokenvalue');
    });

    // expectOne = request
    const request = httpMock.expectOne(req => req.method === 'POST');

    // flush = response
    request.flush(fakeBody, {
      headers: {
        'x-access-token': 'tokenvalue'
      }
    });

    tick();

  }));

});
