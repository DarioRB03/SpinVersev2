import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VideoPlayerComponent } from '../components/video-player/video-player.component';
import { FortuneCookieComponent } from '../components/fortune-cookie/fortune-cookie.component';
import { ExtraSpinComponent } from '../components/extra-spin/extra-spin.component';
import { StoreItemComponent } from '../components/store-item/store-item.component';
import { CoinRewardComponent } from '../components/coin-reward/coin-reward.component';
import { ProfileFrameRewardComponent } from '../components/profile-frame-reward/profile-frame-reward.component';
import { DiscountCouponComponent } from '../components/discount-coupon/discount-coupon.component';

@NgModule({
  declarations: [VideoPlayerComponent, FortuneCookieComponent, ExtraSpinComponent, StoreItemComponent, CoinRewardComponent, ProfileFrameRewardComponent, DiscountCouponComponent ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [VideoPlayerComponent, FortuneCookieComponent, ExtraSpinComponent, StoreItemComponent, CoinRewardComponent, ProfileFrameRewardComponent, DiscountCouponComponent] 
})
export class SharedModule { }