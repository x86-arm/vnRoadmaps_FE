import { cn } from '@/utils';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
}

export default function Logo(props: Props) {
  const { className } = props;
  return (
    <Link to="/" className={cn('mr-6 flex space-x-2', className)}>
      vnRoadmaps{' '}
      <span className="ml-1 select-none rounded-full bg-gradient-to-tr from-blue-500 to-pink-500 px-2 py-1 text-sm font-semibold text-white">
        Beta
      </span>
    </Link>
  );
}
