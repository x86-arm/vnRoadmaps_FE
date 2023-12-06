import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { cn } from '@/utils';

interface Props {
  results: {
    name: string;
    slug: string;
    image: string;
  }[];
}

export default function SearchResult(props: Props) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4 lg:w-[80vw]">
      {props.results.map((item, index) => (
        <Link key={index} to={'/roadmaps/' + item.slug} className="relative">
          <Card
            className={cn(
              'group flex h-24 cursor-pointer items-center justify-center bg-cover bg-center p-5 text-center transition-all hover:border-white',
              `hover:bg-transparent`
            )}
          >
            <span className="transition-all group-hover:scale-[1.1] group-hover:text-white group-hover:drop-shadow-xl">
              {item.name}
            </span>
          </Card>
          <img
            src={item.image}
            className="absolute left-0 top-0 z-[-1] h-full w-full rounded-lg object-cover"
          />
        </Link>
      ))}
    </div>
  );
}
