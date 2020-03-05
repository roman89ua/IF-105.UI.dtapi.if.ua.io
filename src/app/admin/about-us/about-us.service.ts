import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  private githubApiUrl = 'https://api.github.com/';

  private httpClient: HttpClient;

  constructor(handler: HttpBackend) {
     this.httpClient = new HttpClient(handler);
  }

  getLanguageData() {
    return this.httpClient.get(`${this.githubApiUrl}repos/roman89ua/IF-105.UI.dtapi.if.ua.io/languages`);
  }

  getContributorsData() {
    return this.httpClient.get(`${this.githubApiUrl}repos/roman89ua/IF-105.UI.dtapi.if.ua.io/stats/contributors`);
  }

  getUserNames(username) {
    return this.httpClient.get(`${this.githubApiUrl}users/${username}`);
  }
}
