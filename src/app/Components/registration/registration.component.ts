import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  interests:any[]=['Cricket','Football','Hockey','Kabbadi','Chess']
  selectedImage:any;


  StateList=[{
    name:'Maharashtara'
  },{
    name:'Madhya Pradesh'
  },{
    name:'Utter Pradesh'
  },{
    name:'Himachal Pradesh'
  }
];

CityList=[{
  name:'Pune'
},{
  name:'Mumbai'
},{
  name:'Bhopal'
},{
  name:'Patna'
}
];



public condition:boolean;

  constructor(private http:DataService,private router:Router) { }

  RegistrationForm=new FormGroup({
    image:new FormControl('',[Validators.required]),
    fname:new FormControl('',[Validators.required,Validators.maxLength(20),Validators.pattern('[a-zA-Z]+$')]),
    lname:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    number:new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    interest:new FormControl('',[Validators.required]),
    checkbox:new FormControl(false,[Validators.requiredTrue]),
    age:new FormControl(20),
    addressType: new FormControl('Home', Validators.required),
    address1: new FormControl(''),
    address2: new FormControl(''),
    companyAddress1: new FormControl(''),
    companyAddress2: new FormControl('')
    

  });

  get image(){
    return this.RegistrationForm.get('image');
  }
  get fname(){
    return this.RegistrationForm.get('fname');
  }
  get lname(){
    return this.RegistrationForm.get('lname');
  }
  get email(){
    return this.RegistrationForm.get('email');
  }
  get number(){
    return this.RegistrationForm.get('number');
  }
  get state(){
    return this.RegistrationForm.get('state');
  }
  get city(){
    return this.RegistrationForm.get('city');
  }
  get interest(){
    return this.RegistrationForm.get('interest');
  }
  get age(){
    return this.RegistrationForm.get('age');
  }
  get address1(){
    return this.RegistrationForm.get('address1')
  }
  get address2(){
    return this.RegistrationForm.get('address2')
  }
  get companyAddress1(){
    return this.RegistrationForm.get('companyAddress1')
  }
  get companyAddress2(){
    return this.RegistrationForm.get('companyAddress2')
  }

  

  ngOnInit(): void {
    this.RegistrationForm.get('addressType').valueChanges.subscribe(value => {
      if (value === 'Home') {
        this.RegistrationForm.get('address1').setValidators(Validators.required);
        this.RegistrationForm.get('address2').setValidators(null);
        this.RegistrationForm.get('companyAddress1').setValidators(null);
        this.RegistrationForm.get('companyAddress2').setValidators(null);
      } else if (value === 'Company') {
        this.RegistrationForm.get('address1').setValidators(null);
        this.RegistrationForm.get('address2').setValidators(null);
        this.RegistrationForm.get('companyAddress1').setValidators(Validators.required);
        this.RegistrationForm.get('companyAddress2').setValidators(null);
      }

      this.RegistrationForm.get('address1').updateValueAndValidity();
      this.RegistrationForm.get('address2').updateValueAndValidity();
      this.RegistrationForm.get('companyAddress1').updateValueAndValidity();
      this.RegistrationForm.get('companyAddress2').updateValueAndValidity();
    });

  }





  Submit():void{
    if(this.RegistrationForm.valid){
      
      
      this.http.saveUserData(this.RegistrationForm.value).subscribe((result)=>{
        console.warn(result);
         this.RegistrationForm.reset();
         this.selectedImage=false;
         this.router.navigateByUrl('/profile')
    
      },
      (error)=>{
        console.error('Error',error);
      });
    }else{
      alert('Form Not Valid')
    }

    
  }

  removeButton(){
    this.router.navigateByUrl('/home')
  }



  removeInterest(index:number){
   if(index >=0 && index < this.interests.length){
    const removedInterest = this.interests.splice(index,1)[0];
    this.RegistrationForm.patchValue({interest : [removedInterest]
    })
   }

    }



   

  
      onFileSelected(event: any): void {
        const file: File | null = event.target.files && event.target.files[0];
        if (file) {
          // Checking image type
          if (['image/jpeg', 'image/png','image/svg','image/jpeg'].includes(file.type)) {
            // Check image size
            const img = new Image();
            img.onload = () => {
              if (img.width === 310 && img.height === 325) {
                const reader = new FileReader();
                reader.onload = (e:any) => {
                  this.selectedImage = e.target.result;
                };
                reader.readAsDataURL(file);
              } else {
                console.error('Image dimensions must be 310x325 pixels.');
                alert('Image dimensions must be 310x325 pixels.')
                this.image.reset()
              }
            };
            img.src = URL.createObjectURL(file);
          }
        else {
            console.error('Only PNG and JPG images are allowed.');
            alert('Only PNG and JPG images are allowed.');
            this.image.reset();
          }
        }
      }
  
      
     
    
     

 

}
