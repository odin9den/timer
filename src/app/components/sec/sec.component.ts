import { Component, OnInit } from '@angular/core';
import { Observable } from 'node_modules/rxjs';
import { from } from 'rxjs';
import { timer } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map, bufferCount, filter } from 'rxjs/operators';
import { Button } from 'protractor';

@Component({
  selector: 'app-sec',
  templateUrl: './sec.component.html',
  styleUrls: ['./sec.component.scss'],
})
export class SecComponent implements OnInit {
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  zeros: string = '0';
  zerom: string = '0';
  zeroh: string = '0';
  intervalsec: any;
  intervalmin: any;
  intervalh: any;
  subscribeTimer: any;
  startstop: boolean = false;
  clickCount = 2;
  clickTimespan = 300;

  constructor() {}

  oberserableTimer() {
    const seconds = timer(1000, 2000);
    const secondsabc = seconds.subscribe((val) => {
      console.log(val, '+');

      this.subscribeTimer = this.seconds + val;
    });

    const minutes = timer(1000, 2000);
    const minutesabc = minutes.subscribe((val) => {
      console.log(val, '+');
      this.subscribeTimer = this.minutes + val;
    });

    const hours = timer(1000, 2000);
    const hourssabc = minutes.subscribe((val) => {
      console.log(val, '+');
      this.subscribeTimer = this.hours + val;
    });
  }

  startstopTimer() {
    this.startstop = !this.startstop;
    if (this.startstop) {
      this.intervalsec = setInterval(() => {
        if (this.seconds >= 9) {
          this.zeros = '';
        } else {
          this.zeros = '0';
        }

        if (this.seconds == 59) {
          this.seconds = 0;
          this.zeros = '0';
        } else {
          this.seconds++;
        }
      }, 1000);

      this.intervalmin = setInterval(() => {
        if (this.minutes >= 10) {
          this.zerom = '';
        } else {
          this.zerom = '0';
        }

        if (this.minutes == 60) {
          this.minutes = 0;
          this.zerom = '0';
        } else if (this.seconds == 0) {
          this.minutes++;
        } else {
          this.minutes != 0;
        }
      }, 1000);
      this.intervalh = setInterval(() => {
        if (this.hours >= 10) {
          this.zeroh = '';
        } else {
          this.zeroh = '0';
        }

        if (this.hours == 24) {
          this.hours = 0;
          this.zeroh = '0';
        } else if (this.minutes == 60) {
          this.hours++;
        } else {
          this.hours != 0;
        }
      }, 1000);
    } else {
      clearInterval(this.intervalsec);
      clearInterval(this.intervalmin);
      clearInterval(this.intervalh);
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
    }
  }

  pauseTimer() {
    fromEvent(document.getElementsByTagName('span'), 'click')
      .pipe(
        map(() => new Date().getTime()),
        bufferCount(this.clickCount, 1),
        filter((timestamps) => {
          return timestamps[0] > new Date().getTime() - this.clickTimespan;
        })
      )
      .subscribe(() => {
        clearInterval(this.intervalsec);
        clearInterval(this.intervalmin);
        clearInterval(this.intervalh);
        this.startstop = !this.startstop;
      });
  }

  resetTimer() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  ngOnInit() {}
}
