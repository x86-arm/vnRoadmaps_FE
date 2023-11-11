import { cn } from '@/utils';
import React from 'react';

export default function ProgressByParts({ parts }: { parts: boolean[] }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-6 w-6 select-none items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
        1
      </div>
      {parts.map((isActive: boolean, index: number) => (
        <React.Fragment key={index}>
          <div
            className={cn(
              '-z-10 -mx-2 h-3 w-48',
              isActive ? 'bg-foreground' : 'bg-muted'
            )}
          ></div>
          <div
            className={cn(
              'flex h-6 w-6 select-none items-center justify-center rounded-full text-xs font-bold',
              isActive
                ? 'bg-foreground text-background'
                : 'bg-muted text-foreground'
            )}
          >
            {index + 2}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
