import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvaterupdateService {

  objectList:any =[
    "face",
    "dimpal",
    "fracal",
    "earring",
    "eyeshadow",
    "eyeball",
    "eye",
    "eyebrow",
    "eyebrow_colour",
    "glass",
    "hair",
    "hair_colour",
    "hat_hair",
    "facial_hair",
    "facial_hair_colour",
    "mouth",
    "mouthColor",
    "nose"
  ];
  constructor(private http:HttpClient) { }

  apiUrl:any = "https://www.bigbadmoji.com/api/";


  getDefaultImage(data){
    return this.http.get(this.apiUrl+"get-only-default-face?gender="+data);
  }

  getListOfObject(data){
    let objectname = data.object;
    let imgId = localStorage.getItem('imgId');
    return this.http.get(this.apiUrl+"get-only-face-option?generated_image_id="+imgId+"&object="+objectname);
  }

  getAndSetNewAvaterImg(data){
    let objectname = data.object;
    let imgId = localStorage.getItem('imgId');
    let objectId = data.objectId;
    return this.http.get(this.apiUrl+"set-only-face-option?generated_image_id="+imgId+"&object="+objectname+"&object_id="+objectId);
  }
}
