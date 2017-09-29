import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataEditorService } from '../data-mover/data-editor.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataEditorService],
})
export class LoginComponent implements OnInit {
  failed: boolean;
  loginForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private _dataEditor: DataEditorService,
    private router: Router
  ) { }

  ngOnInit() {
    this._dataEditor.isLoggedIn().subscribe((resTasks) => {
      if (resTasks.state) {
        this.router.navigate(['/']);
      }
    });
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(
            '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'
              )]],
      password: [null, [Validators.required]]
    });
  }
  onSubmit() {
    const email = this.loginForm.get('email'),
          password = this.loginForm.get('password');
    if (email.valid && password.valid) {
      this._dataEditor.login({EMAIL: email.value, PASSWORD: password.value}).subscribe
      ((LogIn) => {
        if (LogIn && LogIn.EMAIL) {
          NavbarComponent.updateUserStatus.next(true);
          this.router.navigate(['/']);
        }else {
          this.failed = true;
        }
      });
    }
  }

}

