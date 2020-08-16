import { Component, OnInit, Input } from '@angular/core';

/**
 * This list component is a reusable component. We can define the styles here
 * so that every list going forward will look the same!
 *
 * @export
 * @class ListComponent
 * @implements {OnInit}
 */
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
