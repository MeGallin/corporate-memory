import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('Contact => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateX(-100%)' }),
          animate(
            '0.8s ease-in-out',
            style({ opacity: 1, transform: 'translateX(0%)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ opacity: 1, transform: 'translateX(0%)' }),
          animate(
            '0.8s ease-in-out',
            style({ opacity: 0, transform: 'translateX(100%)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
  transition('Home => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateX(-100%)' }),
          animate(
            '0.8s ease-in-out',
            style({ opacity: 1, transform: 'translateX(0%)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ opacity: 1, transform: 'translateX(0%)' }),
          animate(
            '0.8s ease-in-out',
            style({ opacity: 0, transform: 'translateX(100%)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
  transition('Contact => Home', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateX(-100%)' }),
          animate(
            '0.8s ease-in-out',
            style({ opacity: 1, transform: 'translateX(0%)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ opacity: 1, transform: 'translateX(0%)' }),
          animate(
            '0.8s ease-in-out',
            style({ opacity: 0, transform: 'translateX(100%)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
//https://medium.com/@tejozarkar/angular-route-transition-animation-in-5-easy-steps-ab0ddc8230e
