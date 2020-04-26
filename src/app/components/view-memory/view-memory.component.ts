import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import * as Moment from 'moment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-memory',
  templateUrl: './view-memory.component.html',
  styleUrls: ['./view-memory.component.css']
})
export class ViewMemoryComponent implements OnInit {
  tagForm: FormGroup;
  public memories = [];
  public numberOfMemories: number;
  public nearestToDueDate: string;
  public countDownNumber: number;

  public showFilterArrows: boolean;
  public tags = [];

  public now = Moment().format();
  public bsValue = new Date();

  searchTerm: string;
  public formArray = [];

  isCollapsed: Boolean = true;
  public disableTagButton: boolean = true;
  public displayEditForm: boolean = true;
  public displayTagForm: boolean = false;

  toggleView: boolean = true;

  modalRef: BsModalRef;

  constructor(
    private _Http: HttpService,
    private formBuilder: FormBuilder,
    private _Auth: AuthService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.tagForm = this.formBuilder.group({
      tagName: ['']
    });

    this._Http.getMemory().subscribe(res => {
      this.memories = res;
      this.numberOfMemories = this.memories.length;

      // Filter out and sort nearest due
      const filterDate = this.memories.filter(memory => {
        if (memory.dueDate !== '0000-00-00') {
          return memory;
        }
      });
      const nearestToDueDateArray = filterDate.sort((a, b) => {
        const aA = Moment(a.dueDate).unix();
        const bB = Moment(b.dueDate).unix();
        return aA - bB;
      });
      this.nearestToDueDate = nearestToDueDateArray[0].dueDate;
      // Filter out and sort nearest due
    });

    this._Http.getTags().subscribe(res => {
      this.tags = res;
    });
  }

  //Calculate the number of MEMORIES

  // Filtering
  filterByDueDateUP(a, b) {
    const aA = Moment(a.dueDate).unix();
    const bB = Moment(b.dueDate).unix();

    if (isNaN(aA) && isNaN(bB)) {
      return null;
    } else {
      if (aA < bB) return 1;
      else if (aA === bB) return 0;
      else return -1;
    }
  }

  filterByDueDateDOWN(a, b) {
    const aA = Moment(a.dueDate).unix();
    const bB = Moment(b.dueDate).unix();

    if (isNaN(aA) && isNaN(bB)) {
      return null;
    } else {
      if (aA > bB) return 1;
      else if (aA === bB) return 0;
      else return -1;
    }
  }

  sortType(sort) {
    if (sort === 'dueDate_up' || sort === 'dueDate_down') {
      if (this.countDownNumber) {
        false;
      } else {
        this._Http.countDown().subscribe(res => {
          this.countDownNumber = res;
        });
      }
    }

    if (sort === 'dueDate_up') {
      this.memories.sort(this.filterByDueDateUP);
      this.showFilterArrows = false;
    }

    if (sort === 'dueDate_down') {
      this.memories.sort(this.filterByDueDateDOWN);
      this.showFilterArrows = false;
    }
  }
  // END Filtering

  deleteMemory(id) {
    this._Http.deleteMemory(id).subscribe(res => {
      console.log('Memory Deleted'), res;
    });
  }

  showEditForm(formData) {
    this.displayTagForm = true;
    this.disableTagButton = false;
    this.isCollapsed = false;
    this.formArray = [{ ...formData }];
  }
  handleEdit(formData) {
    this.isCollapsed = true;
    const newForm = {
      id: formData.id.value,
      title: formData.title.value,
      memory: formData.memory.value,
      dueDate: formData.dueDate.value
    };
    this._Http.updateMemory(newForm).subscribe(memory => {
      console.log('Form Updated', memory);
    });
  }
  closeEditForm() {
    this.isCollapsed = true;
    this.disableTagButton = true;
  }

  closeTag() {
    this.isCollapsed = true;
    this.displayEditForm = true;
    this.displayTagForm = false;
    this.disableTagButton = true;
  }
  showTagForm() {
    this.isCollapsed = false;
    this.displayEditForm = false;
    this.displayTagForm = true;
  }
  handleTag(tag, id) {
    this.displayEditForm = true;
    this.displayTagForm = false;
    this.disableTagButton = true;
    const email = this._Auth.userProfile.name;
    const tagArray = { memoryId: id, email: email, ...tag.value };
    // console.log('tagArray', tagArray);
    this._Http.postTag(JSON.stringify(tagArray)).subscribe(
      res => {
        console.log('Tag Created', res);
        return res;
      },
      err => {
        //  console.log('There was an error', err);
        return err;
      }
    );
    this.tagForm.reset();
  }

  onSearch(e) {
    // console.log(e);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // Delete Tag
  deleteTag(id) {
    this._Http.deleteTag(id).subscribe(res => {
      console.log('Tag deleted', res);
    });
  }
}
