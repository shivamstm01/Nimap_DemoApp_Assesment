import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popup:boolean


  constructor(private route:Router) { }

  Registerbutton(){
   alert('Register Button');
   this.route.navigateByUrl('/registration')
    
  }

  ngOnInit() {
  }

}
