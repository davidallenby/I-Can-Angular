import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() title: string;
  @Input() items: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
