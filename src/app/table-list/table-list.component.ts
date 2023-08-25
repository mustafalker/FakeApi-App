import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FakeApi } from 'app/shared/fake-api.model';
import { FakeApiService } from 'app/shared/fake-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  comments: any[] = [];

  constructor(public service : FakeApiService ,private http : HttpClient ,private toastr: ToastrService) { }

  ngOnInit() {
    this.loadComments();
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

}
