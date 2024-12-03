import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RewardModalComponent } from '../components/reward-modal/reward-modal.component';
import { VideoPlayerComponent } from '../components/video-player/video-player.component';

@NgModule({
  declarations: [RewardModalComponent, VideoPlayerComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [RewardModalComponent, VideoPlayerComponent] 
})
export class SharedModule { }