import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FakeApi } from 'app/shared/fake-api.model';
import { FakeApiService } from 'app/shared/fake-api.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  commentId: number;
  comment: FakeApi = new FakeApi();

  url: string = environment.apiBaseUrl + '/UpdateComment'
  location: any;

  constructor(public service: FakeApiService, private toastr: ToastrService, private http: HttpClient, 
    private route: ActivatedRoute, private router: Router) { }

  updateCommentbyId() {
    if (this.service.formSubmitted) {
      return;
    }
    this.loadComment();
    
    this.service.updateComment(this.comment).subscribe({
      next: res => {
        this.toastr.info('Updated Success');
        this.router.navigate(['/table-list']); 
      },
      error: error => {
        console.error('Error updating comment:', error);
        console.log('Response body:', error.error);
      }
    });
  }

  loadComment() {
    if (this.commentId) {
      this.service.getCommentById(this.commentId).subscribe({
        next: (comment: FakeApi) => {
          this.comment = comment;
        },
        error: error => {
          console.error('Error loading comment:', error);
        }
      });
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.commentId = +params.get('id');
      this.loadComment();
    });
  }
}
