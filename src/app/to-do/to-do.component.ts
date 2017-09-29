import { Component, OnInit } from '@angular/core';
import { DataEditorService } from '../data-mover/data-editor.service';
import { Task } from '../models/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  providers: [DataEditorService],
})
export class ToDoComponent implements OnInit {
  public tasks: Array<Task>;
  public Form: FormGroup;

  constructor(private _dataEditor: DataEditorService,
    private _formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit() {
    this._dataEditor.isLoggedIn().subscribe((resTasks) => {
      if (!resTasks.state) {
        this.router.navigate(['/login']);
      }
    });
    this.getTasks();
    this.Form = this._formBuilder.group({
      title: null,
      body: null
    });
  }
  private getTasks() {
    this._dataEditor.getTasks().subscribe((Tasks) => {
      this.tasks = Tasks;
    });
  }

  searchFor(value: any) {
    const date = value.value;
    if (date.length > 0) {
      this._dataEditor.searchForDate(date).subscribe((Tasks) => {
        this.tasks = Tasks;
      });
    }else {
      this.getTasks();
    }
  }
  onSubmit() {
    const title = this.Form.get('title').value,
    body = this.Form.get('body').value;
    if ( body == null || body === '' || title == null || title === '') {
    }else {
      // tslint:disable-next-line:prefer-const
      let task = new Task();
      task.DATE = new Date();
      task.DONE = false;
      task.BODY = body;
      task.TITLE = title;
      this._dataEditor.addTask(task).subscribe((added) => {
        const con = added[0];
        this.tasks.push({_id: con._id, EMAIL: con.EMAIL, TITLE: con.TITLE, BODY: con.BODY, DATE: con.DATE, DONE: con.DONE});
        this.Form.get('title').setValue(null);
        this.Form.get('body').setValue(null);
      });
    }
  }

  updateTask(task: Task) {
    task.DONE = !task.DONE;
    this._dataEditor.updateTask(task).subscribe();
  }

  delete(_id: string) {
    this._dataEditor.deleteTask(_id).subscribe(() => {
      for (let index = 0; index < this.tasks.length; index++) {
        const element = this.tasks[index];
        if (element._id === _id) {
          this.tasks.splice(index, 1);
        }
      }
    });
  }
}
