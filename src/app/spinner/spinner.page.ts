import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../service/loader.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.page.html',
  styleUrls: ['./spinner.page.scss'],
})
export class SpinnerPage implements OnInit {

  constructor(public loader: LoaderService) { }

  ngOnInit() {
  }



 

}
