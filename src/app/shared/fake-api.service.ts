import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { FakeApi } from './fake-api.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  url: string = environment.apiBaseUrl + '/AddCommentFromVs'
  list: FakeApi[] = [];
  formData : FakeApi = new FakeApi()
  formSubmitted:boolean = false ;


  constructor(private http : HttpClient) { }

  refreshList() {
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as FakeApi[]
        },
        error: err => { console.log(err) }
      })
  }

  postOneComment(){
    return this.http.post(this.url,this.formData)
  }
  resetForm(form:NgForm){
    form.resetForm()
    this.formData = new FakeApi()
    this.formSubmitted = false;
  }

  getComment(): Observable<number[]> {
    return this.http.get<any[]>(environment.apiBaseUrl + '/RemoveComment'); 
  }

  updateComment(comment: FakeApi): Observable<any> {
    return this.http.put(
      `${environment.apiBaseUrl}/UpdateComment/${comment.id}`,
      comment
    );
  }

  getCommentById(id: number): Observable<FakeApi> {
    return this.http.get<FakeApi>(
      `${environment.apiBaseUrl}/UpdateComment/${id}`
    );
  }
}
