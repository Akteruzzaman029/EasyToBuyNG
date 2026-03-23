import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
@Directive({
  selector: '[appDebounceInput]',
  standalone: true,
})
export class DebounceInputDirective implements OnInit, OnDestroy {
  @Input() debounceTimeMs = 500;
  @Output() debounceValue = new EventEmitter<string>();

  private subscription?: Subscription;
  private lastValue = '';

  constructor(
    private elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
  ) {}

  ngOnInit(): void {
    const nativeElement = this.elementRef.nativeElement;

    const input$ = fromEvent(nativeElement, 'input').pipe(
      map((event: Event) => (event.target as HTMLInputElement).value ?? ''),
      debounceTime(this.debounceTimeMs),
      distinctUntilChanged(),
    );

    const blur$ = fromEvent(nativeElement, 'blur').pipe(
      map(() => nativeElement.value ?? ''),
      distinctUntilChanged(),
    );

    this.subscription = merge(input$, blur$).subscribe((value: string) => {
      if (this.lastValue !== value) {
        this.lastValue = value;
        this.debounceValue.emit(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
