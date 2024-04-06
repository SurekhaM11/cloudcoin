import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { CustomValidators } from 'src/app/auth/create-localwallet/setup-mail-psw/custom-validators';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-security-dash',
  templateUrl: './security-dash.component.html',
  styleUrls: ['./security-dash.component.scss']
})
export class SecurityDashComponent implements OnInit {

  setPassForm: FormGroup;
  fieldTextType: boolean;
  isShow: boolean = true;
  isCheck: boolean = false;
  isSelect: boolean = false;
  isLow: boolean = false;
  isMedium: boolean = false;
  isStrong: boolean = false;
  randomUrl: any;

  public themeDarkActive: boolean;
  public themeLightActive: boolean;
  selectedFile: File;
  selectedData: any = null;
  username: any = 'USERNAME';
  walletName: any;
  walletEmail: any;
  walletPin: string;
  agreed1 = false;
  agreed2 = true;
  registerTapped = false;
  complete = false;
  errorMessage: string = null;
  registerParams: any = null;
  completeMessage: string = null;
  cardImage: string = null;
  cardImageBlank: string = null;
  progressMessage: string = null;
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_login.json'
  };
  errorOptions: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/error.json'
  };
  showLoader = false;
  showNormal = true;
  showError = false;
  buttonText = 'Select CC';
  freeCoin = true;
  user: string;
  uniqueString = null;
  randomUrlChar: string;
  randomUrlEvent: string;
  randomUrlPlace: string;
  randomUrlThing: string;
  randomUrlVerb_01: string;
  randomUrlVerb_02: string;
  randombgcolor: string;
  randomChar: string;
  randomPlace: string;
  randomEvent: string;
  randomThing: string;
  randomV1: string;
  randomV2: string;
  randombgcolorC: string;
  randombgcolorP: string;
  randombgcolorE: string;
  randombgcolorT: string;
  randombgcolorV1: string;
  randombgcolorV2: string;
  constructor(
    private eventService: EventService,
    private router: Router,
    public fb: FormBuilder) {
    this.setPassForm = this.fb.group({
      password: [null,
        Validators.compose([
          Validators.required,
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(8)
        ])
      ],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    })

    if (localStorage.getItem('themeLightActive') == '1') {
      this.themeLightActive = true;
      this.themeDarkActive = false;
    } else if (localStorage.getItem('themeLightActive') == '0') {
      this.themeLightActive = false;
      this.themeDarkActive = true;
    } else {
      this.themeLightActive = true;
      this.themeDarkActive = false;
    }
    if (localStorage.getItem('userDetails')) {
      let user = JSON.parse(localStorage.getItem('userDetails'));
      if (user.hostname) {
        this.username = user.hostname;
        this.walletName = user.hostname;
      }
    }
  }

  themeDarkCaller() {
    if (this.themeDarkActive == false) {
      this.themeDarkActive = true;
      this.themeLightActive = false;
      localStorage.setItem('themeLightActive', '0');
      this.eventService.emitThemeTogEvent();
    }
  }
  themeLightCaller() {
    if (this.themeLightActive == false) {
      this.themeLightActive = true;
      this.themeDarkActive = false;
      localStorage.setItem('themeLightActive', '1');
      this.eventService.emitThemeTogEvent();
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('userSky');
    this.getPicture();
  }

  setNewvalues(e) {
    let z = this.setPassForm.get('password').value
    if ((/[A-Z]/.test(z) && z?.length >= 8) || (z?.length > 8 && /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(z)) || (/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(z) && /[A-Z]/.test(z))) {
      this.isMedium = true;
    }
    else {
      this.isMedium = false;
    }
  }

  getStatus(e) {
    this.isSelect = e.target.checked;
    if (this.isSelect == false) {
      this.setPassForm.controls['email'].disable();
      this.setPassForm.controls['email'].patchValue('');
    } else {
      this.setPassForm.controls['email'].enable();

    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  getPicture() {
    var Place = ['pyramid', 'river', 'mountain', 'eiffel-tower', 'statue-of-liberty', 'hills', 'desert', 'sea', 'jungle', 'skyscraper', 'park', 'pond', 'sewer', 'dump', 'zoo', 'theater', 'bathroom', 'cave', 'palace', 'carnival', 'party', 'casino', 'post-office', 'castle', 'museum', 'forest', 'well', 'dog-house', 'backyard', 'airport', 'football-field', 'gymnasium'];
    var Event = ['explosion', 'solar-eclipse', 'meteor-shower', 'blizzard', 'wind', 'hurricane', 'landslide', 'heart-attack', 'fire', 'war', 'tornado', 'tsunami', 'heat-wave', 'plague', 'holiday', 'alien-encounter', 'famine', 'infestation', 'time-warp', 'stench', 'ship-wreck', 'oil-spill', 'stock-rally', 'implosion', 'disappearance', 'revolution', 'ice-age', 'mud-slide', 'flood', 'lighting-strike', 'animal-attack', 'drought'];
    var Thing = ['bottle', 'rabbit', 'skull', 'watermellon', 'doll-house', 'flag', 'toy', 'pot', 'wallet', 'camera', 'cell-phone', 'glasses', 'pen', 'flashlight', 'neckware', 'gold-nugget', 'brick', 'briefcase', 'picture', 'statue', 'necklace', 'chicken-dinner', 'lost-man', 'blindfolded-man', 'snake', 'hat', 'book', 'wand', 'fairy', 'tuba', 'lantern', 'ring', 'carrot', 'flute'];
    var Character = ['minotaur', 'doctor', 'athlete', 'businessman', 'nerd', 'gangster', 'hippy', 'punk', 'princess', 'dentist', 'cyclops', 'dragon', 'unicorn', 'bigfoot', 'viking', 'witch', 'robot', 'cheerleader', 'farmer', 'clown', 'soldier', 'pirate', 'scientist', 'professor', 'king', 'giant', 'troll', 'mermaid', 'dinosaur', 'gnome', 'vampire', 'magician'];
    var Verb1 = ['swimming', 'running', 'walking', 'eating', 'hunting', 'fishing', 'shopping', 'reading', 'drawing', 'laughing', 'launching', 'cooking', 'digging', 'thinking', 'painting', 'sitting', 'dressing', 'bowling', 'spying', 'sking', 'waving', 'playing', 'gardening', 'sunbathing', 'drinking', 'gambling', 'smoking', 'flying', 'playing-baseball', 'showering', 'talking', 'playing-guitar'];
    var verb2 = ['kicked', 'spit-on', 'looked-at', 'touched', 'rubbed', 'sat-on', 'trashed', 'hugged', 'kissed', 'lifted', 'rolled', 'sold', 'dropped', 'broke', 'poked', 'buried', 'wrote-on', 'pocketed', 'washed', 'gifted', 'stolen', 'displayed', 'pushed', 'pulled', 'smelled', 'measured', 'listened', 'directed', 'studied', 'turned', 'licked', 'punched', 'blindfolded'];
    var bgColor = ['#CC0000', '#FF4500', '#FFD700', '#808000', '#ADFF2F', '#2F4F4F', '#008088', '#00BFFF', '#191970', '#0000CD', '#8A2BE2', '#8B008B', '#FF1493', '#FFE4C4', '#D2691E', '#BC8F8F', '#FFF0F5', '#708090', '#778899', '#000000', '#008000', '#00CED1', '#1E90FF', '#87CEFA', '#4B0082', '#800080', '#FF00FF', '#F5DEB3', '#A0522D', '#696969', '#CD853F', '#8B0000'
    ]
    var randomNumP = Math.floor(Math.random() * Place.length);
    var randomNumE = Math.floor(Math.random() * Event.length);
    var randomNumC = Math.floor(Math.random() * Character.length);
    var randomNumV1 = Math.floor(Math.random() * Verb1.length);
    var randomNumV2 = Math.floor(Math.random() * verb2.length);
    var randomNumT = Math.floor(Math.random() * Thing.length);

    this.randomChar = Character[randomNumC]
    this.randomPlace = Place[randomNumP]
    this.randomEvent = Event[randomNumE]
    this.randomThing = Thing[randomNumT]
    this.randomV1 = Verb1[randomNumV1]
    this.randomV2 = verb2[randomNumV2]
    this.randombgcolorC = bgColor[randomNumC]
    this.randombgcolorP = bgColor[randomNumP]
    this.randombgcolorE = bgColor[randomNumE]
    this.randombgcolorT = bgColor[randomNumT]
    this.randombgcolorV1 = bgColor[randomNumV1]
    this.randombgcolorV2 = bgColor[randomNumV2]

    this.randomUrlChar = 'assets/icons/Character/' + this.randomChar + ".png";
    this.randomUrlEvent = 'assets/icons/Event/' + this.randomEvent + ".png";
    this.randomUrlPlace = 'assets/icons/Place/' + this.randomPlace + ".png";
    this.randomUrlThing = 'assets/icons/Thing/' + this.randomThing + ".png";
    this.randomUrlVerb_01 = 'assets/icons/Verb_01/' + this.randomV1 + ".png";
    this.randomUrlVerb_02 = 'assets/icons/Verb_02/' + this.randomV2 + ".png";
  }

  isValidInput(value: any) {
    return this.setPassForm.controls[value].invalid &&
      (this.setPassForm.controls[value].dirty || this.setPassForm.controls[value].touched);
  }

  save() {
    localStorage.setItem('emailSky', this.setPassForm.controls.email.value);
    localStorage.setItem('passSky', this.setPassForm.controls.password.value);
    this.router.navigate(['dashboard/create-skyvault-dash/upload-cc']);
  }

}
