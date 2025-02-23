import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() placeholder: string = 'Введите текст...';
  @Input() buttonText: string = 'Отправить';
  @Output() submitForm = new EventEmitter<string>();
  inValid = false;

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
      this.form.reset();
      this.inValid = false;
    } else this.inValid = true;
  }
}
