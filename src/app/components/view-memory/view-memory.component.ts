import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-view-memory',
  templateUrl: './view-memory.component.html',
  styleUrls: ['./view-memory.component.css']
})
export class ViewMemoryComponent implements OnInit {
  public memories = [];
  showHideEditForm: boolean;
  public formArray = [];

  constructor(private _Http: HttpService) {}

  ngOnInit(): void {
    this.showHideEditForm = false;
    this._Http.getMemory().subscribe(res => {
      // console.log(res);
      this.memories = res;
    });
  }

  handleEdit(formData) {
    const newForm = {
      id: formData.id.value,
      title: formData.title.value,
      memory: formData.memory.value
    };
    this._Http.updateMemory(newForm).subscribe(memory => {
      console.log('Form Updated', memory);
    });
    this.showHideEditForm = false;
  }

  showHide(formData) {
    this.showHideEditForm = true;
    this.formArray = [{ ...formData }];
    console.log(this.formArray);
  }
}
