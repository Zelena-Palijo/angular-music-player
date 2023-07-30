import { Component } from '@angular/core';

import { Music } from './music';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-music-player';
  audio = new Audio();
  musicLength: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';

  constructor() {
    this.audio.ondurationchange = () => {
      console.log('Duration change event fired.' );
      const totalSeconds = Math.floor(this.audio.duration),
          duration = moment.duration(totalSeconds, 'seconds');
      this.musicLength = duration.seconds() < 10 ?
                      `${Math.floor(duration.asMinutes())}:
                      0${duration.seconds()}` :
                      `${Math.floor(duration.asMinutes())}:
                      ${duration.seconds()}`;
      this.duration = totalSeconds;
    }

    this.audio.ontimeupdate = () => {
      const duration = moment.duration(
        Math.floor(this.audio.currentTime), 'seconds');
      this.currentTime = duration.seconds() < 10 ?
                      `${Math.floor(duration.asMinutes())}:
                      0${duration.seconds()}` :
                      `${Math.floor(duration.asMinutes())}:
                      ${duration.seconds()}`;
    }
    
  }

  musicList: Music[] = [
    {
      album: "Test",
      title: "Clap",
      artist: "Internet",
      url: "/assets/clap.mp3"
    },
    {
      album: "Test",
      title: "Meditate",
      artist: "Internet",
      url: "/assets/medidate.mp3"
    },
    {
      album: "Test",
      title: "Tango",
      artist: "Internet",
      url: "/assets/tango.mp3"
    },

  ];

  displayedColumns: string[] = ['title', 'artist', 'album'];
  trackPointer: number = 0;
  currentMusic: Music = {
    album: "",
      title: "",
      artist: "",
      url: ""
  }

  play(index?: number): void {
    if (index === undefined) {
      if (this.audio.paused) {
        if (this.audio.readyState === 0) {
          this.trackPointer = 0;
          this.currentMusic = this.musicList[0];
          this.audio.src = this.currentMusic.url;
        }
        this.audio.play();
      } else {
        this.audio.pause();
      }
    } else {
      this.trackPointer = index;
      this.currentMusic = this.musicList[index];
      this.audio.src = this.currentMusic.url;
      this.audio.play();
    }
    
  }

  prev(): void {
    this.trackPointer--;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }

  next(): void {
    this.trackPointer++;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }

  volumeSlider(event: any) {
    this.audio.volume = event.value / 16;
  }

  durationSlider(event: any) {
    this.audio.currentTime = event.value;
  }
}
