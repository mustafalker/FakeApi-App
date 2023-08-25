import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(public service: FakeApiService, private toastr: ToastrService, private http: HttpClient, 
    private route: ActivatedRoute, private router: Router) { }

    updateCommentbyId() {
      // Eğer zaten işlem yapılıyorsa, tekrar işlem yapmamak için return keywordünü kullandık
      if (this.service.formSubmitted) {
        return;
      }
      this.service.formSubmitted = true; 
      this.service.updateComment(this.comment).subscribe(
        res => {
          this.toastr.info('Updated Success');
          this.router.navigate(['/table-list']);
        },
        error => {
          console.error('Error updating comment:', error);
          console.log('Response body:', error.error);
        }
      );
    }

  loadComment() {
    if (this.commentId) {
      this.service.getCommentById(this.commentId).subscribe(
        (comment: FakeApi) => {
          this.comment = comment;
        },
        error => {
          console.error('Error loading comment:', error);
        }
      );
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.commentId = +params.get('id');
      this.loadComment();
    });
  }
}

