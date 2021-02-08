import { async, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { AlertModule } from "src/app/shared/componets/alert/alert.module";
import { LoadingModule } from "src/app/shared/componets/loading/loading.module";
import { MenuModule } from "src/app/shared/componets/menu/menu.module";
import { UserService } from "../user/user.service";
import { HeaderComponent } from "./header.component";

describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let userService: UserService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [UserService],
      imports: [
        RouterTestingModule.withRoutes([]),
        MenuModule,
        AlertModule,
        LoadingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);

    spyOn(userService, 'getUser')
      .and
      .returnValue(of({
        email: 'bruno@email.com',
        name: 'Bruno',
        id: 1
      }));

      const fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('should be instantiate', () => {
    expect(component).toBeTruthy;
  });

  it('should logout', () => {
    const logoutSpy = spyOn(userService, 'logout').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');

    component.logout();

    expect(logoutSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

});
