import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SelectModule } from 'ng2-select';
import { NgxSelectModule } from 'ngx-select-ex'
import { SharedModule } from '../../shared/shared.module';
import { DxDataGridModule } from 'devextreme-angular';
import { UserService } from './users.service';
import { ListUsersComponent } from './list/users-list.component';
import { EditUserRoleComponent } from './edit-user-role/edit-user-role.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'list', component: ListUsersComponent },
  //{ path: 'edit-user-role', component: EditUserRoleComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxSelectModule,
    DxDataGridModule,
    NgbModule.forRoot()
  ],
  declarations: [
    ListUsersComponent,
    EditUserRoleComponent
  ],
  providers: [UserService],
  exports: [
    RouterModule
  ],
  entryComponents: [EditUserRoleComponent]
})
export class UsersModule { }
