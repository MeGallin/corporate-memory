import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-view-memory',
  templateUrl: './view-memory.component.html',
  styleUrls: ['./view-memory.component.css']
})
export class ViewMemoryComponent implements OnInit {
  public memories = [];
  constructor(private _Http: HttpService) {}

  ngOnInit(): void {
    this._Http.getMemory().subscribe(res => {
      // console.log(res);
      this.memories = res;
    });
  }
}
