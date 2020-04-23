import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-post-memory',
  templateUrl: './post-memory.component.html',
  styleUrls: ['./post-memory.component.css']
})
export class PostMemoryComponent implements OnInit {
  blogFrom: FormGroup;

  constructor(
    private _Http: HttpService,
    private formBuilder: FormBuilder,
    private _Auth: AuthService
  ) {}

  ngOnInit(): void {
    this.blogFrom = this.formBuilder.group({
      title: [''],
      memory: [''],
      dueDate: ['']
    });
  }

  sendMessage(data) {
    const subId = this._Auth.userProfile.sub;
    const email = this._Auth.userProfile.name;

    console.log('SUB', subId);
    const formArray = { subId: subId, email: email, ...data };
    console.log(JSON.stringify(formArray));
    this._Http.postMemory(JSON.stringify(formArray)).subscribe(
      res => {
        console.log('Contact form done', res);
        return res;
      },
      err => {
        //  console.log('There was an error', err);
        return err;
      }
    );
    this.blogFrom.reset();
  }
}
