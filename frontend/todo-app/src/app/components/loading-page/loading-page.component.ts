import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  private subscriptions: Subscription[] = []
  constructor(
    private loaderService: LoaderService
  ) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(_x => {
      _x.unsubscribe()
    })
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.loaderService.isLoading.asObservable().subscribe((_isLoading) => {
        this.isLoading = _isLoading
      })
    )
  }

}
