import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen min-w-[100vw] items-center justify-center">
      <Loader2 className="h-9 w-9 animate-spin" />
    </div>
  );
}
