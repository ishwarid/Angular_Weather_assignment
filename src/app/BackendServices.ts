import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";


@Injectable()
export class BackendService {

    constructor(private httpClient: HttpClient) { }

    configUrl = 'https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/';

    getData(metric: any, location: any): Observable<any> {
        return this.httpClient.get(this.configUrl + metric + '-' + location + '.json');
    }
}
