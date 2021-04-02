import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './hw/book.component';
import { ProfileComponent } from './profile/profile.component';
import { WishComponent } from './wish/wish.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { BookDetailsComponent} from './book-details/book-details.component';
import { RatingComponent} from './rating/rating.component';

const routes: Routes = [
  { path: 'books', component: BookComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'wish', component: WishComponent },
  { path: 'shop', component: ShopCartComponent },
  { path: 'details', component: BookDetailsComponent},
  { path: 'details/:theRequest', component: BookDetailsComponent},
  { path: 'rating', component: RatingComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
