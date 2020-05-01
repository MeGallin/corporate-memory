import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ContactFormService } from "../../services/contact-form.service";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.css"],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private _httpContactFormService: ContactFormService) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      hiddenName: new FormControl(""),
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      telephone: new FormControl(""),
      message: new FormControl("", Validators.required),
    });
  }

  sendMessage(message) {
    console.log(message);
    this._httpContactFormService
      .sendFormData(JSON.stringify(message))
      .subscribe(
        (res) => {
          //   console.log("Contact form done", res);
        },
        (err) => {
          //  console.log('There was an error', err);
          return err;
        }
      );
    this.contactForm.reset();
  }
}
