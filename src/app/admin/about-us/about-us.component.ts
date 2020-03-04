import { Component, OnInit } from '@angular/core';
import {
  Bezgachnyuk,
  Petryshyn,
  Shevchyk,
  Kostiuk,
  Khomitskyi,
  Kravchuk,
  Zikratyi,
  Kravtsiv,
  Chykharivskyi
} from './photos';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  public bezgachnyuk = Bezgachnyuk;
  public petryshyn = Petryshyn;
  public shevchyk = Shevchyk;
  public kostiuk = Kostiuk;
  public khomitskyi = Khomitskyi;
  public kravchuk = Kravchuk;
  public zikratyi = Zikratyi;
  public kravtsiv = Kravtsiv;
  public chykharivskyi = Chykharivskyi;

  constructor() { }

  ngOnInit() {
  }

}
