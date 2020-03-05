import { Component, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

const URL = '';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL });
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }
    constructor() { }

    ngOnInit() {
    }

}
