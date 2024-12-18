import { Validators } from "@angular/forms";

export const RegisterForm = {
    username: [null, [Validators.required, Validators.maxLength(255)]],
    email: [null, [Validators.required, Validators.maxLength(255), Validators.email]],
    elo: [null, [Validators.min(0), Validators.max(3000)]],
    gender: [null, [Validators.required]],
    birthDate: [new Date(), [Validators.required]]
}