import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit {
  code: any;
  registerForm: any = {
    msisdn: null
  }

  constructor(private registerService: RegisterService,
              private router: Router,
              private toastr: ToastrService,
              private auth: AuthService) { }

  ngOnInit(): void {
  }

  sendCode() {
    if (this.code.length == 6 && !this.code.includes('-')) {
      let data = {
        code: "000000",
        msisdn: "77016177761"
      }
      this.registerService.checkOTP(data).subscribe(
        res => {
          
          this.router.navigate(['/biometry'])
        },
        error => {
          this.toastr.error('Введен неверный код', 'Ошибка!');
        }
      )
    }
  }

  sendSms() {
    this.auth.sendSms({ msisdn: "77016177761" }).subscribe(res => {
    })
  }
}
