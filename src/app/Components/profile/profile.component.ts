import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private httpData:DataService,private sanitizer:DomSanitizer,private router:Router) { }
  UserLetestData:any=[];
  selectedImage:any;

  showdata=false;
  


  
  

  

  ngOnInit(): void {
    this.loadData();
    
  }

 

  loadData(): void {
    this.httpData.getAllUserData().subscribe((allData: any[]) => {
        console.log(allData);
        if (allData && allData.length > 0) {
          // Get the last item from the array for Letest data
          const latestData = allData[allData.length - 1];
          // Assign the latest data to UserData array
          this.UserLetestData = [latestData];
          console.log([latestData.id]);
        } else {
          console.log('No data found.');
        }
      },
      (error: any) => {
        console.error('Failed to fetch data', error);
      }
    );
  }


  ProfileClick(){
      this.httpData.EditPicForm=false;

  }

  ImageClick(){
    
    this.httpData.EditPicForm=true;
  }



  // Sanitize image URL before binding it to the <img> element
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

}
