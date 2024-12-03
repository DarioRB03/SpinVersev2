import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reward-modal',
  templateUrl: './reward-modal.component.html',
  styleUrls: ['./reward-modal.component.scss']
})
export class RewardModalComponent {
  @Input() rewardIcon: string = 'help-circle';
  @Input() rewardName: string = 'Recompensa';
  @Output() close = new EventEmitter<void>();

  closeRewardModal() {
    this.close.emit();
  }
}
