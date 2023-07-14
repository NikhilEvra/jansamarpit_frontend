import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-interceptor',
  templateUrl: './interceptor.page.html',
  styleUrls: ['./interceptor.page.scss'],
})
export class InterceptorPage implements OnInit {

  private totalRequests = 0;
  
  constructor(private loadingService: LoaderService) { }

  ngOnInit() {
   
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('caught')
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
          // console.log('off')
        }
      })
    );
  }
}
