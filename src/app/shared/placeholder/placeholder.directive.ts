import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
	selector: '[appPlaceholder]'
})

export class PlaceholderDirective {
	consturctor(public viewContainerRef: ViewContainerRef) { }
}