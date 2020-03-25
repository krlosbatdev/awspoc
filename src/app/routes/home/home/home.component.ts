import { Component, OnInit } from "@angular/core";
import * as S3 from "aws-sdk/clients/s3";

const URL = "https://texttractpoc.s3.us-west-2.amazonaws.com";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  selectedFiles: FileList;
  constructor() {}

  ngOnInit() {}

  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadFile(file);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadFile(file) {
    const contentType = file.type;
    const bucket = new S3({
      accessKeyId: "AKIAR2C2XSE6FIBLGVSM",
      secretAccessKey: "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",
      region: "us-west-2"
    });
    const params = {
      Bucket: "texttractpoc",
      Key: file.name,
      Body: file,
      ACL: "public-read",
      ContentType: contentType
    };
    bucket.upload(params, function(err, data) {
      if (err) {
        console.log("There was an error uploading your file: ", err);
        return false;
      }
      console.log("Successfully uploaded file.", data);
      return true;
    });
    //for upload progress
    /*bucket.upload(params).on('httpUploadProgress', function (evt) {
              console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
          }).send(function (err, data) {
              if (err) {
                  console.log('There was an error uploading your file: ', err);
                  return false;
              }
              console.log('Successfully uploaded file.', data);
              return true;
          });*/
  }
}
