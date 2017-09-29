import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataEditorService } from '../data-mover/data-editor.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DataEditorService],
})
export class NavbarComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  login: boolean;
  constructor(public editor: DataEditorService,
  public router: Router) {
    NavbarComponent.updateUserStatus.subscribe(res => {
      this.editor.isLoggedIn().subscribe((resTasks) => {
        this.login = resTasks.state;
      });
    });
  }

  ngOnInit() {
  }

  logout() {
    this.editor.logOut();
    NavbarComponent.updateUserStatus.next(true);
    this.router.navigate(['/login']);
  }

}
