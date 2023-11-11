import React from 'react';
import { cn } from '@/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Clock } from 'lucide-react';
import { Input } from './input';

export default function TimePicker() {
  const [hours, setHours] = React.useState<number>(0);
  const [minutes, setMinutes] = React.useState<number>(0);
  const [seconds, setSeconds] = React.useState<number>(0);

  const [open, setOpen] = React.useState<boolean>(false);

  const [timeInput, setTimeInput] = React.useState<string>('');
  function getTimeString() {
    if (hours == 0 && minutes == 0 && seconds == 0) {
      setTimeInput('Chọn giờ');
      return;
    }
    const timeString = `${hours}:${minutes}:${seconds}`;
    setTimeInput(timeString);
  }

  React.useEffect(() => {
    getTimeString();
  }, [hours, minutes, seconds]);

  function onBlurTimeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const timeArr = event.target.value.split(':');

    if (
      (timeArr.length = 3) &&
      parseInt(timeArr[0]) <= 24 &&
      parseInt(timeArr[1]) <= 60 &&
      parseInt(timeArr[2]) <= 60
    ) {
      setHours(parseInt(timeArr[0]));
      setMinutes(parseInt(timeArr[1]));
      setSeconds(parseInt(timeArr[2]));
    }

    console.log(event.target.value.length);

    if (event.target.value.length == 0) {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }

    getTimeString();
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className="group relative">
          <Input
            type="text"
            className={cn(
              'w-full cursor-pointer justify-start pl-10 text-left font-normal group-hover:text-foreground',
              hours == 0 &&
                minutes == 0 &&
                seconds == 0 &&
                'text-muted-foreground'
            )}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTimeInput(event.target.value)
            }
            value={timeInput}
            onFocus={() => {
              setOpen(true);
            }}
            onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
              onBlurTimeInput(event)
            }
          />
          <Clock
            className={cn(
              'absolute left-[13px] top-[13px] mr-2 h-4 w-4 cursor-pointer group-hover:text-foreground',
              hours == 0 &&
                minutes == 0 &&
                seconds == 0 &&
                'text-muted-foreground'
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="my-2 w-auto p-0">
        <div className="grid h-[240px] grid-cols-3">
          <div className="overflow-y-scroll border-r-[1px] p-2">
            {Array.from(Array(24).keys()).map((key, index) => (
              <div
                key={index}
                onClick={() => setHours(key)}
                className="flex w-[40px] cursor-pointer select-none items-center justify-center rounded-md py-1 hover:bg-muted"
              >
                {key}
              </div>
            ))}
          </div>
          <div className="overflow-y-scroll border-r-[1px] p-2">
            {Array.from(Array(60).keys()).map((key, index) => (
              <div
                key={index}
                onClick={() => setMinutes(key)}
                className="flex w-[40px] cursor-pointer select-none items-center justify-center rounded-md py-1 hover:bg-muted"
              >
                {key}
              </div>
            ))}
          </div>
          <div className="overflow-y-auto p-2 hover:overflow-y-scroll">
            {Array.from(Array(60).keys()).map((key, index) => (
              <div
                key={index}
                onClick={() => setSeconds(key)}
                className="flex w-[40px] cursor-pointer select-none items-center justify-center rounded-md py-1 hover:bg-muted"
              >
                {key}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t-[1px] pr-2">
          <Button
            variant={'link'}
            onClick={() => {
              const now = new Date();
              setHours(now.getHours());
              setMinutes(now.getMinutes());
              setSeconds(now.getSeconds());
            }}
          >
            Bây giờ
          </Button>
          {/* <Button variant={'default'} className="h-[25px] w-[30px]" >
            OK
          </Button> */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
