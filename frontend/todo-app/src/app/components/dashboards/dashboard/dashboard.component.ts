import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  list1 = ["abc"]
  list2 = []

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchUrlData()
  }


  fetchUrlData(): void {
  }


}
