import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from '../../forms/register.form';
import { MemberService } from '../../../../core/services/member.service';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { catchError, map, of } from 'rxjs';
import { CustomValidator } from '../../../../core/validators/custom-validators';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    FloatLabelModule,
    InputNumber,
    ButtonModule,
    FormErrorComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly memberService = inject(MemberService);
  private readonly messageService = inject(MessageService);

  form: FormGroup

  isLoading:boolean = false;

  genders = [
    { value: 0, label: 'Garçon' },
    { value: 1, label: 'Fille' },
    { value: 2, label: 'Autre' },
  ]

  constructor() {
    this.form = this.formBuilder.group(RegisterForm);
    this.form.controls['email']
      .addAsyncValidators(control => 
        CustomValidator.exists(this.memberService.existsEmail(control.value), 'email'))

    this.form.controls['username']
      .addAsyncValidators(control => 
        CustomValidator.exists(this.memberService.existsUsername(control.value), 'username'))
  }

  submit() {
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.memberService.add(this.form.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'OK !!!' });
        this.isLoading = false;
      },
      error: (xhr: any) => {
        console.log(xhr)
        this.messageService.add({ severity: 'error', summary: xhr.error });
        this.isLoading = false;
      }
    })
  }
}
