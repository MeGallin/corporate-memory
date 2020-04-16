import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit {
  public dateTime;
  constructor() {}

  ngOnInit(): void {
    this.dateTime = interval(1000).pipe(map(() => new Date()));
  }
}
