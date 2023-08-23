import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FakeApiService } from 'app/shared/fake-api.service';
import { url } from 'inspector';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FakeApi } from 'app/shared/fake-api.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  [x: string]: any;
  form: FormGroup;

  constructor(private http: HttpClient , public service : FakeApiService,private toastr: ToastrService,private fb: FormBuilder) {}

  onSubmit(form: NgForm) {
    if (form.valid){
      this.insertRecord(form);
    }
  }

  insertRecord(form : NgForm) {
    this.service.postOneComment()
      .subscribe({
        next: res => {
          this.service.formSubmitted = true;
          this.service.list = res as FakeApi[]
          this.service.resetForm(form)
          this.toastr.success('Inserted Success', 'Comment Added')
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
