import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUserSubject: BehaviorSubject<boolean>;
    public currentUser: Observable<boolean>;

    constructor() {
        this.currentUserSubject = new BehaviorSubject<boolean>(false);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): boolean {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        if (username === "test" && password === "Admin@123") {
            this.currentUserSubject.next(true);
        } else {
            this.currentUserSubject.next(false);
        }
        return this.currentUserSubject;
    }


}