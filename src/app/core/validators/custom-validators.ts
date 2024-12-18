import { AbstractControl } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";

export const CustomValidator = {
    exists : (osb$: Observable<any>, fieldName: string) => {
        return osb$.pipe(
            map(() => ({ exist: { fieldName } })),
            catchError(() => of(null))
        )
    }
}