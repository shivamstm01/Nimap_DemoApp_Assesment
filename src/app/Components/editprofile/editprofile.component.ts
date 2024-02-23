import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {


  interests:any[]=['Cricket','Football','Hockey','Kabbadi','Chess'];
  selectedInterests:string[]=[];
  selectedImage:File|null=null;
  selectedImagePreview: string | ArrayBuffer | null = null;
  public showEditProfile:boolean;
  public showEditImageProfile:boolean






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


  constructor(private http:DataService,private routerurl:Router,private router:ActivatedRoute) { 
    
  }


  
  EditRegistrationForm=new FormGroup({

    fname:new FormControl('',[Validators.required,Validators.maxLength(20),Validators.pattern('[a-zA-Z]+$')]),
    lname:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    number:new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    interest:new FormControl('',[Validators.required]),
    checkbox:new FormControl(false,[Validators.requiredTrue]),
    age:new FormControl(''),
    addressType: new FormControl('Home', Validators.required),
    address1: new FormControl(''),
    address2: new FormControl(''),
    companyAddress1: new FormControl(''),
    companyAddress2: new FormControl('')
  });

  // EditPictureForm=new FormGroup({
    //image:new FormControl('',[Validators.required]),
  // });


  get image(){
    return this.EditRegistrationForm.get('image');
  }
  get fname(){
    return this.EditRegistrationForm.get('fname');
  }
  get lname(){
    return this.EditRegistrationForm.get('lname');
  }
  get email(){
    return this.EditRegistrationForm.get('email');
  }
  get number(){
    return this.EditRegistrationForm.get('number');
  }
  get state(){
    return this.EditRegistrationForm.get('state');
  }
  get city(){
    return this.EditRegistrationForm.get('city');
  }
  get interest(){
    return this.EditRegistrationForm.get('interest');
  }
  get age(){
    return this.EditRegistrationForm.get('age');
  }
  get address1(){
    return this.EditRegistrationForm.get('address1')
  }
  get address2(){
    return this.EditRegistrationForm.get('address2')
  }
  get companyAddress1(){
    return this.EditRegistrationForm.get('companyAddress1')
  }
  get companyAddress2(){
    return this.EditRegistrationForm.get('companyAddress2')
  }

 

  ngOnInit(): void {
    
  this.http.getDataById(this.router.snapshot.params.id).subscribe((result)=>{

    console.warn("result:",result);
    const imgurl=result.image;
    console.log(imgurl);
    
    

      this.EditRegistrationForm=new FormGroup({
        image:new FormControl(result['image']),
        fname:new FormControl(result['fname']),
        lname:new FormControl(result['lname']),
        email:new FormControl(result['email']),
        number:new FormControl(result['number']),
        state:new FormControl(result['state']),
        city:new FormControl(result['city']),
        interest:new FormControl(result['interest']),
        address:new FormControl(result['address']),
        checkbox:new FormControl(result['checkbox']),
        age:new FormControl(result['age']),
        addressType: new FormControl(result['addressType']),
        address1: new FormControl(result['address1']), 
        address2: new FormControl(result['address1']),
        companyAddress1: new FormControl(result['companyAddress1']),
        companyAddress2: new FormControl(result['companyAddress2']),
   
      });
    });


    
    

// this.http.getDataById(this.router.snapshot.params.id).subscribe((result)=>{
//   console.log(result);
//   this.EditPictureForm=new FormGroup({
//     //image:new FormControl(result['image']),
//   })
  
// });


    this.EditRegistrationForm.get('addressType').valueChanges.subscribe(value => {
      if (value === 'Home') {
        this.EditRegistrationForm.get('address1').setValidators(Validators.required);
        this.EditRegistrationForm.get('address2').setValidators(null);
        this.EditRegistrationForm.get('companyAddress1').setValidators(null);
        this.EditRegistrationForm.get('companyAddress2').setValidators(null);
      } else if (value === 'Company') {
        this.EditRegistrationForm.get('address1').setValidators(null);
        this.EditRegistrationForm.get('address2').setValidators(null);
        this.EditRegistrationForm.get('companyAddress1').setValidators(Validators.required);
        this.EditRegistrationForm.get('companyAddress2').setValidators(null);
      }

      this.EditRegistrationForm.get('address1').updateValueAndValidity();
      this.EditRegistrationForm.get('address2').updateValueAndValidity();
      this.EditRegistrationForm.get('companyAddress1').updateValueAndValidity();
      this.EditRegistrationForm.get('companyAddress2').updateValueAndValidity();
    });



    if(this.http.EditPicForm==true){
            this.showEditImageProfile=true
           
    }else{
      this.showEditProfile=true;
    }
    
   
    
  }
 

  UpdateData():void{
    console.warn(this.EditRegistrationForm.value);
   
    if(this.EditRegistrationForm.valid){
      this.http.UpdateEditData(this.router.snapshot.params.id,this.EditRegistrationForm.value).subscribe((result)=>{
        console.log("result:",result);
        
        this.routerurl.navigateByUrl('/profile');
        alert('Data Updated');

        
      },(error)=>{
        console.error('Error Update Data',error);
        
      });
    }else{
      console.log("invalid Form");
      alert("invalid Form");
    }
  }

  // UpdateDataImage(){
  //   if(this.EditPictureForm.valid){
  //     this.http.UpdateEditData(this.router.snapshot.params.id,this.EditPictureForm.value).subscribe((result)=>{
  //       console.warn(result);
  //       this.routerurl.navigateByUrl('/profile');
  //     })
  //   }
  // }


 

  removeButton(){
    this.routerurl.navigateByUrl('/profile')
  }



  // removeInterest(index:number){
  //  if(index >=0 && index < this.interests.length){
  //   const removedInterest = this.interests.splice(index,1)[0];
  //   this.EditRegistrationForm.patchValue({interest : [removedInterest]
  //   })
  //  }
  //   }

    // removeInterest(index: number) {
    //   if (index >= 0 && index < this.interests.length) {
    //     const removedInterest = this.interests.splice(index, 1)[0];
    //     if (!this.selectedInterests.includes(removedInterest)) {
    //       this.selectedInterests.push(removedInterest);
    //     }
    //     this.EditRegistrationForm.patchValue({ interest: this.selectedInterests });
    //   }
    // }

    public onSelect(item) {
      console.log('tag selected: value is ' + item);
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
                  this.EditRegistrationForm.controls['image'].patchValue(this.selectedImage)
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
