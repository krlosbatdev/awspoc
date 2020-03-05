import { Component, OnInit } from "@angular/core";
import { UserService } from "../users.service";
import { User } from "../user.model";
import { Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserRoleComponent } from "../edit-user-role/edit-user-role.component";

const swal = require("sweetalert");

@Component({
  selector: "user-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class ListUsersComponent implements OnInit {

  users: User[];

  constructor(private _userService: UserService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllUsers();
  }


  getAllUsers() {
    this._userService.getAll()
      .subscribe(users => this.users = users);
  }

  addEditUser(officerId: string) {

    const modalRef = this.modalService.open(EditUserRoleComponent, { centered: true });
    modalRef.componentInstance.officerId = officerId;
    modalRef.result
      .then(_ => this.getAllUsers())
      .catch(_ => {});
  }

  removeUser(officerId: string) {
    swal({
      title: "Are you sure?",
      text: "Your will not be able to recover this user!",
      type: "warning",
      buttons: {
        cancel: {
          text: "No, cancel please!",
          value: null,
          visible: true,
          className: "",
          closeModal: false
        },
        confirm: {
          text: "Yes, delete it!",
          value: true,
          visible: true,
          className: "",
          closeModal: false
        }
      }
    }).then((isConfirm) => {
      if (isConfirm) {
        this._userService.removeUser(officerId)
          .subscribe(res => {
            this.users = res;
            swal("Deleted!", "User has been deleted.", "success");
          });
      } else {
        swal("Cancelled", "User is safe.", "error");
      }
    });
  }


}



