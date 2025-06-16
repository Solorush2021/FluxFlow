import * as React from 'react';
import { cn } from '@/lib/utils';

interface LiquidCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const LiquidCard = React.forwardRef<HTMLDivElement, LiquidCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'liquid-glass p-6 text-card-foreground overflow-hidden', // Use the .liquid-glass class from globals.css
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
LiquidCard.displayName = 'LiquidCard';

const LiquidCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-4', className)}
    {...props}
  />
));
LiquidCardHeader.displayName = 'LiquidCardHeader';

const LiquidCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-headline text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
LiquidCardTitle.displayName = 'LiquidCardTitle';

const LiquidCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
LiquidCardDescription.displayName = 'LiquidCardDescription';

const LiquidCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
));
LiquidCardContent.displayName = 'LiquidCardContent';

const LiquidCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));
LiquidCardFooter.displayName = 'LiquidCardFooter';

export {
  LiquidCard,
  LiquidCardHeader,
  LiquidCardFooter,
  LiquidCardTitle,
  LiquidCardDescription,
  LiquidCardContent,
};
