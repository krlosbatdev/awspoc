import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { UserService } from "../users.service";
import { User, Role, Employee } from "../user.model";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { of } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from "rxjs/operators";

@Component({
  selector: "edit-user-role",
  templateUrl: "./edit-user-role.component.html",
  styleUrls: ["./edit-user-role.component.scss"]
})

export class EditUserRoleComponent implements OnInit {

  @Input() officerId;
  formGroup: FormGroup;
  roles: Array<Role>;
  employees: Array<Employee>;
  title: string;
  searchFailed: boolean;
  model: string;

  constructor(private _userService: UserService, private _activeModal: NgbActiveModal, private _fb: FormBuilder) { }

  ngOnInit() {

    this.title = `${(this.officerId ? "Update" : "Add")} User Access`;
    this.buildformGroup(new User());

    this._userService.getUserAccessForm(this.officerId)
      .subscribe(res => {
        this.roles = res.roles;
        this.buildformGroup(res.user);
      });
  }

  //Setters and Getters
  set user(employee: Employee) {
    this.formGroup.get("officerId").setValue(employee.officerId);
    this.formGroup.get("fullName").setValue(employee.fullName);
    this.formGroup.get("model").setValue(this.formatter(employee));
  }

  // convenience getter for easy access to form fields
  get userForm() { return this.formGroup.controls; }

  //Methods
  buildformGroup(user: User): void {
    this.formGroup = this._fb.group(
      {
        officerId: [user.officerId, Validators.required],
        fullName: [user.fullName, Validators.required],
        roleId: user.roleId,
        model: [this.formatter(user), [Validators.required, Validators.minLength(3)]]
      });
  }

  dataSource = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string): Observable<any> => {

        if (term.length < 3) {
          this.searchFailed = false;
          return of([]);
        }

        return this._userService.getAvailableEmployees(term).pipe(
          tap((res: Array<Employee>) => this.searchFailed = res.length < 1),
          catchError(_ => {
            this.searchFailed = true;
            return of([]);
          }),
          map((res: Array<Employee>) => res.slice(0, 10))
        )
      })
    );

  formatter = (obj: Employee) => obj.officerId ? `[${obj.officerId}] ${obj.fullName}` : "";

  onSelect(event: any): void {
    event.preventDefault();
    if (event.item) {
      this.user = event.item;
    }
  }

  onBlur(event: any) {
    event.preventDefault();
    if (this.searchFailed) {
      this.user = new Employee();
      this.searchFailed = false;
    }
  }

  save(): void {
    this._userService.saveUser(this.formGroup.value)
      .subscribe(_ => this._activeModal.close());
  }

  close(): void {
    this._activeModal.dismiss();
  }
}
