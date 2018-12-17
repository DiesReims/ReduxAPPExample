import { Observable } from "rxjs";

export interface iService<T> {

    contractReceived: Observable<T>;
    getAll(): Observable<T>;
    getById(_Data: T): Observable<T>;
    postEntity(_Data: T): Observable<T>;
    PutEntity(_Data: T): Observable<T>;
    deleteEntity(_Data: number): Observable<T>;
}