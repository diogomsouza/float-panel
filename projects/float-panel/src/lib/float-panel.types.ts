export type FloatPanelXPosition = 'before' | 'after';

export type FloatPanelYPosition = 'above' | 'below';

export type FloatPanelClass =
  | string
  | string[]
  | Set<string>
  | {
      [klass: string]: unknown;
    };
