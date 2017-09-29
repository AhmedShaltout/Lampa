import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataEditorService } from '../data-mover/data-editor.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DataEditorService],
})
export class FormComponent implements OnInit {
  success: boolean;
  failed: boolean;
  userForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
              private dataEditor: DataEditorService,
              private router: Router) { }

  ngOnInit() {
    this.success = false;
    this.failed = false;
    this.userForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(
             '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'
              )]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    const email = this.userForm.get('email'),
    password = this.userForm.get('password');
    if (email.valid && password.valid) {
      this.dataEditor.addUser({EMAIL: email.value, PASSWORD: password.value})
      .subscribe((User) => {
        const added = User[0];
        if (added) {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
            }, 1000);
        } else {
          this.failed = true;
          setTimeout(() => {
            this.failed = false;
            }, 1000);
        }
      });
    }else {
      alert('you can\'t submit like that.');
    }
  }

}

