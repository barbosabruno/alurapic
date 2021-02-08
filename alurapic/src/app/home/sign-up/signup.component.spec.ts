import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from "rxjs";
import { VMessageModule } from "src/app/shared/componets/vmessage/vmessage.module";
import { SignUpComponent } from "./signup.component";
import { SignUpService } from "./signup.service";
import { UserNotTakenValidatorService } from "./user-not-taken.validator.service";

describe('SignUpComponent', () => {

  let component: SignUpComponent;
  let router: Router;
  let signUpService: SignUpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        SignUpService,
        UserNotTakenValidatorService
      ],
      imports: [
        HttpClientTestingModule,
        VMessageModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {

    router = TestBed.get(Router);
    signUpService = TestBed.get(SignUpService);

    const fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    buildForm();
  });

  it('should be instantiate', () => {
    expect(component).toBeTruthy;
  });

  it('should create a new user', () => {
    spyOn(signUpService, 'signup').and.returnValue(of(null));
    const navigateSpy = spyOn(router, 'navigate');

    component.signUp();

    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should handle error', () => {
    spyOn(signUpService, 'signup')
      .and
      .returnValue(throwError('Server error'));

    const logSpy = spyOn(console, 'log');

    component.signUp();

    expect(logSpy).toHaveBeenCalledWith('Server error');
  });

  const buildForm = () => {
    component.signupForm.get('email').setValue('bruno@email.com');
    component.signupForm.get('fullName').setValue('Bruno');
    component.signupForm.get('userName').setValue('bruno');
    component.signupForm.get('password').setValue('12345678');
  }

});
