import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JoinRoomBanner } from "../../components/join-room-banner/join-room-banner";
import { CategoriesPage } from "../categories-page/categories-page";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, JoinRoomBanner, CategoriesPage],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
}
