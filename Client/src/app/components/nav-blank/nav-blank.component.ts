import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css',
})
export class NavBlankComponent {
  private readonly _AuthService = inject(AuthService);
  logOut(): void {
    this._AuthService.logOut();
  }
}
