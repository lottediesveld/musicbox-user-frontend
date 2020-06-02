import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'textinput',
  templateUrl: './textinput.component.html',
  styleUrls: ['./textinput.component.scss']
})
export class TextinputComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() value: string;
  constructor() { }

  ngOnInit(): void {
  }

}
