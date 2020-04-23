import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpService } from "../../services/http.service";
import { AuthService } from "../../services/auth.service";
import * as Moment from "moment";

@Component({
  selector: "app-view-memory",
  templateUrl: "./view-memory.component.html",
  styleUrls: ["./view-memory.component.css"],
})
export class ViewMemoryComponent implements OnInit {
  tagForm: FormGroup;
  public memories = [];
  public tags = [];
  public now = Moment().format();

  searchTerm: string;

  showHideMemoryForm: boolean = true;
  showHideEditForm: boolean = false;
  showHideTagForm: boolean = false;
  public formArray = [];

  constructor(
    private _Http: HttpService,
    private formBuilder: FormBuilder,
    private _Auth: AuthService
  ) {}

  ngOnInit(): void {
    this.tagForm = this.formBuilder.group({
      tagName: [""],
    });

    setInterval(() => {
      this._Http.getMemory().subscribe((res) => {
        this.memories = res;
      });
      this._Http.getTags().subscribe((res) => {
        this.tags = res;
      });
    }, 3600);
  }

  deleteMemory(id) {
    this._Http.deleteMemory(id).subscribe((res) => {
      console.log("Memory Deleted"), res;
    });
  }

  handleEdit(formData) {
    this.showHideEditForm = false;
    const newForm = {
      id: formData.id.value,
      title: formData.title.value,
      memory: formData.memory.value,
      dueDate: formData.dueDate.value,
    };
    this._Http.updateMemory(newForm).subscribe((memory) => {
      console.log("Form Updated", memory);
    });
  }

  showEditForm(formData) {
    this.showHideEditForm = true;
    this.formArray = [{ ...formData }];
  }
  closeEditDelete() {
    this.showHideEditForm = false;
  }
  closeTag() {
    this.showHideTagForm = false;
  }

  showHideTag() {
    this.showHideTagForm = true;
  }

  handleTag(tag, id) {
    const email = this._Auth.userProfile.name;
    const tagArray = { memoryId: id, email: email, ...tag.value };
    console.log("tagArray", tagArray);
    this._Http.postTag(JSON.stringify(tagArray)).subscribe(
      (res) => {
        console.log("Tag Created", res);
        return res;
      },
      (err) => {
        //  console.log('There was an error', err);
        return err;
      }
    );
    this.tagForm.reset();
  }
  onSearch(e) {
    console.log(e);
  }
}
