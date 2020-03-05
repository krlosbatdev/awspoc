import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  public user: any;
  public app: any;
  private layout: any;
  public baseUrl: string;

  public token: any;

  constructor() {

    // // User Settings
    // // -----------------------------------
    // this.user = {
    //     name: 'John',
    //     job: 'ng-developer',
    //     picture: 'assets/img/user/02.jpg'
    // };

    // // App Settings
    // // -----------------------------------
    // this.app = {
    //     name: 'Angle',
    //     description: 'Angular Bootstrap Admin Template',
    //     year: ((new Date()).getFullYear())
    // };

    // User Settings
    // -----------------------------------
    this.user = {
      name: 'Link ',
      email: 'link@bankunited.com ',
      department: '',
      officerId: '123',
      role: 'Loan Officer',
      picture: 'assets/img/user/02.jpg',
    };

    // App Settings
    // -----------------------------------
    this.app = {
      name: '',
      description: '',
      year: ((new Date()).getFullYear()),
      env: 'dev'
    };

    //TODO: refactor
    if (this.app.env === "dev") {
      this.baseUrl = 'http://localhost:45211/';
    }
    else {
      this.baseUrl = '/server/';
    }

    // Layout Settings
    // -----------------------------------
    this.layout = {
      isFixed: true,
      isCollapsed: false,
      isBoxed: false,
      isRTL: false,
      horizontal: false,
      isFloat: false,
      asideHover: false,
      theme: null,
      asideScrollbar: false,
      isCollapsedText: false,
      useFullLayout: false,
      hiddenFooter: false,
      offsidebarOpen: false,
      asideToggled: false,
      viewAnimation: 'ng-fadeInUp'
    };

  }

  getAppSetting(name) {
    return name ? this.app[name] : this.app;
  }
  getUserSetting(name) {
    return name ? this.user[name] : this.user;
  }
  getLayoutSetting(name) {
    return name ? this.layout[name] : this.layout;
  }

  setAppSetting(name, value) {
    if (typeof this.app[name] !== 'undefined') {
      this.app[name] = value;
    }
  }
  setUserSetting(name, value) {
    if (typeof this.user[name] !== 'undefined') {
      this.user[name] = value;
    }
  }
  setLayoutSetting(name, value) {
    if (typeof this.layout[name] !== 'undefined') {
      return this.layout[name] = value;
    }
  }

  toggleLayoutSetting(name) {
    return this.setLayoutSetting(name, !this.getLayoutSetting(name));
  }

}
