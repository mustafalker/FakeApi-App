import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FakeApi } from 'app/shared/fake-api.model';
import { FakeApiService } from 'app/shared/fake-api.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  [x: string]: any;

  comments: any[] = [];

  constructor(public service : FakeApiService ,private http : HttpClient ,private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getComment().subscribe((yorumlar: any[]) => {
      this.comments = yorumlar;
      this.loadComments();

      interval(5000).subscribe(() => {
        this.loadComments();
      });
    });
  }
  loadComments() {
    this.service.getComment().subscribe(
      (yorumlar: any[]) => {
        this.comments = yorumlar.map(yorum => Object.assign(new FakeApi(), yorum));
      },
      error => {
        console.error("Yorumlar alınırken hata oluştu:", error);
      }
    );
  }
  onDeleteComment(id : number){
    if(confirm('Are you sure to delete this record?'))
    this.http.delete(environment.apiBaseUrl + '/RemoveComment'+ '/' +id)
    .subscribe({
      next:res =>{
        this.service.list = res as FakeApi[]
        this.toastr.error('Deleted Success', 'Comment Deleted')
        this.loadComments()
      }
    })
  }
  onDeleteAllComments(id : string){
    this.http.delete(environment.apiBaseUrl + '/RemoveComment')
    .subscribe();
  }
}
