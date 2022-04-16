import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Item } from './model/item-backlog';
import { DashboardService } from './service/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  itemList!: Item[];
  itemList2!: Item[];
  draggedItem!: any;
  private subscriptions: Subscription[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.dashboardService
        .getAllItemBacklog()
        .pipe(takeUntil(this.destroy$))
        .subscribe((item) => {
          this.itemList = item.data;
        })
    );
    this.subscriptions.push(
      this.dashboardService
        .getAllItemBacklog2()
        .pipe(takeUntil(this.destroy$))
        .subscribe((item2) => {
          this.itemList2 = item2.data;
        })
    );
  }
  dragStart(event: any, item: Item) {
    this.draggedItem = item;
  }
  drop(event: any) {
    if (this.draggedItem) {
      let draggedBookIndex = this.findIndex(this.draggedItem);
      this.itemList2 = [...this.itemList2, this.draggedItem];
      this.itemList = this.itemList.filter((val, i) => i != draggedBookIndex);
      this.draggedItem = null;
    }
  }
  dragEnd(event: any) {
    this.draggedItem = null;
  }
  findIndex(item: Item) {
    let index = -1;
    for (let i = 0; i < this.itemList.length; i++) {
      if (item.name === this.itemList[i].name) {
        index = i;
        break;
      }
    }
    return index;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
