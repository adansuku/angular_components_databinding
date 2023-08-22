import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
	providedIn: 'root' // with this is not neccesary to add in app.module.ts
})

export class DataStorageService {
	constructor(private http: HttpClient) { }

}