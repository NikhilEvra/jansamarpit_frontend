import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-loadnow',
  templateUrl: './loadnow.component.html',
  styleUrls: ['./loadnow.component.scss'],
})
export class LoadnowComponent implements OnInit {

  constructor(public loader: LoaderService) { }

  ngOnInit() {}

}
