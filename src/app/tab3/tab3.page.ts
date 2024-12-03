import { Component, OnInit } from '@angular/core';
import { VideosService } from '../core/services/videos.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  videos: any[] = [];
  selectedVideoId: string | null = null;

  constructor(private videosService: VideosService) {}


  ngOnInit() {
    console.log('Videos page loaded');
    this.loadVideos();
  }

  loadVideos() {
    this.videosService.getVideos().subscribe(
      (response) => {
        this.videos = response.items;
      },
      (error) => {
        console.error('Error loading videos', error);
      }
    );
  }

  playVideo(videoId: string) {
    this.selectedVideoId = videoId;
  }

  closeVideoPlayer() {
    this.selectedVideoId = null;
  }
}
