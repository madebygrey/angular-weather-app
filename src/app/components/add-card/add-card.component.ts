import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit, OnDestroy {
  darkMode?: boolean;
  mode$?: Subscription;

  constructor(public ui: UiService) {}

  ngOnInit(): void {
    this.mode$ = this.ui.darkModeState.subscribe((value) => {
      this.darkMode = value;
    });
  }

  ngOnDestroy(): void {
    this.mode$?.unsubscribe();
  }
}
