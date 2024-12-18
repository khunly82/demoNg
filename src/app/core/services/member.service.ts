import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  add(member: any) {
    return this.httpClient.post(environment.baseUrl + '/api/member', member);
  }

  existsEmail(email: string) {
    return this.httpClient.head(environment.baseUrl + '/api/member', { params: {email} })
  }

  existsUsername(username: string) {
    return this.httpClient.head(environment.baseUrl + '/api/member', { params: {username} })
  }
}
