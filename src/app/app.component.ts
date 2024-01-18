import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showMenu = false;
  darkModeActive: boolean = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  modeToggleSwitch() {
    console.log('switched');
  }
}
