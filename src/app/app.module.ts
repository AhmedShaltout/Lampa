import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoComponent } from './to-do/to-do.component';

const ROUTER = [{path: 'register', component: FormComponent},
                {path: 'login', component: LoginComponent},
                {path: 'tasks', component: ToDoComponent}
              ];
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    NavbarComponent,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTER)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
