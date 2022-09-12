import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';
import { ToastrService } from 'ngx-toastr';


declare function loadVideo(): any;
declare const gtag: Function;

@Component({
  selector: 'app-verilive',
  templateUrl: './verilive.component.html',
  styleUrls: ['./verilive.component.scss']
})
export class VeriliveComponent implements OnInit {

  user: any = {
    firstName: null,
    iin: null,
    lastName: null,
    patronymic: null,
    phone: null,
  }

  veriData: any = {
    verigramId: null,
    iin: null
  }

  verifaceLoad: boolean = true;
  vfImage: boolean = true;
  requestId: any = null;
  qparams: any = null;
  disabled: boolean = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private registerService: RegisterService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.qparams = queryParams;
    });
    // this.createRequest();
    this.loadScript('https://s3.eu-central-1.amazonaws.com/verilive-statics.verigram.ai/verilive-v1.12.x.js');
    this.loadScript('../assets/js/verilive.js');
    fromEvent(window, 'build').subscribe((event: any) => {
      this.showSignUP()
    });
  }


  changeStatus() {
    let data = this.auth.getUser;
    data.identificationStatus = "FULL_IDENTIFIED"
    this.auth.saveUser(data);
  }

  createRequest() {
    let data = this.auth.getUser;
    this.user.firstName = data.firstName;
    this.user.lastName = data.lastName;
    this.user.phone = data.username;
    this.user.iin = data.iin;

    this.registerService.getLoanRequestId(this.user).subscribe(res => {
      this.requestId = res.requestId
      this.router.navigate(['/profile/verilive'], { queryParams: {...this.qparams, requestId:this.requestId}})
    }, error => {
      if (error.status === 403) {
        this.toastr.clear();
        alert("К сожалению, Вам было отказано в займе. Просим Вас оплатить текущие займы в других организациях. В случае, если займы отсутствуют на сегодняшнюю дату, наберите нам по номеру +7(701)0105800. Приносим свои извинения!");
        this.router.navigate(['/main']);
        document.querySelector('btns')!.classList.add('disable');
      }
    });
  }

  showSignUP() {
    let image = (<HTMLInputElement>document.getElementById("results")).value;
    if (!this.requestId) {
      return;
    }
    this.registerService.sendImage(this.requestId, image).subscribe(res => {
      if (res.identified) {
        this.changeStatus();
        this.getPersData();
        this.disabled = false;
      } else {
        this.disabled = false;
        this.toastr.warning('Пожалуйста попробуйте еще раз пройти идентификацию лица', '');
      }
    }, error => {
      this.registerService.resendImage(this.requestId, image).subscribe(res => {
        if (res.identified) {
          console.log(res);
          this.changeStatus();
          this.getPersData();
          this.disabled = false;
        } else {
          this.disabled = false;
          this.toastr.warning('Пожалуйста попробуйте еще раз пройти идентификацию лица', '');
        }
      }, error => {
        this.disabled = false;
      })
    })
  }

  getPersData() {
    this.registerService.getInfoByIIN(this.requestId).subscribe(res => {
      localStorage.setItem('pinfo', JSON.stringify(res));
      this.router.navigate(['/approved']);
    });
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
