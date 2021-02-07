import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Directive({
    selector: '[formValidation]'
})
export class FormValidationDirective {
    @Input()
    form: NgForm;
    @Output()
    validSubmit: EventEmitter<any> = new EventEmitter<any>();

    constructor(private el: ElementRef) {
    }

    @HostListener('submit', ['$event'])
    onSubmit(event) {
        if (!this.form.valid) {
            event.preventDefault();
            const target: HTMLElement = this.el.nativeElement.querySelector('.ng-invalid');
            // @ts-ignore
            if (target && target.previousSibling && target.previousSibling.scrollIntoView) {
                // @ts-ignore
                target.previousSibling.scrollIntoView({behavior: 'smooth'});
            }
            return false;
        }
        this.validSubmit.emit();
    }
}
