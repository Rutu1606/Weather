import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';


describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthenticationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('test login() then expect currentUserSubject to emit true when credentials are correct', () => {
        let retunedVal;
        service.currentUserSubject.subscribe(val => {
            retunedVal = val
        })
        service.login("test", "Admin@123");
        expect(retunedVal).toBeTrue();
    });

    it('test login() then expect currentUserSubject to emit false when credentials are incorrect', () => {
        let retunedVal;
        service.currentUserSubject.subscribe(val => {
            retunedVal = val
        })
        service.login("rutu", "vaibhav");
        expect(retunedVal).toBeFalse();
    });
});
