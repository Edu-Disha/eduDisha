import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { OVERVIEW_CONSTANTS } from "../constants/overview.constants";

@Injectable({
    providedIn: 'root'
})
export class ApiGateService {
    envirnoment: any;
    constructor(
        private readonly http: HttpClient,
        @Inject(OVERVIEW_CONSTANTS.ENV_VAR) private readonly env: any
    ) {
        this.envirnoment = env;
    }

    ownerLogin(data: any) {
        return this.http.post(`${this.envirnoment.owner}/login`, data);
    }
}