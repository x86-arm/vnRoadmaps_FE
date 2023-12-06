import { Card } from '@/components/ui/card';
import { provinceServices } from '@/services/provinceServices';
import { ChevronRight, Map } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { cn } from '@/utils';
import { store } from '@/store';

interface Provinces {
  name: string;
  slug: string;
  description: string;
  mapsUrl: string;
  image: string;
  thingsToDo: {
    name: string;
    type: string;
    mapsUrl: string;
    image: string;
    price: number;
    description: string;
  }[];
}

export default function RoadmapsItem() {
  const [province, setProvince] = useState<Provinces>();

  const { slug } = useParams();

  if (!slug) return <></>;

  useEffect(() => {
    provinceServices
      .getProvince(
        { slug },
        store.getState().userReducer.tokens.accessToken as any
      )
      .then((res) => setProvince(res.data))
      .catch(() => {
        throw 'Error';
      });
  }, []);

  return (
    <div className=" px-12 py-5">
      <div className="flex text-muted-foreground">
        <Link
          className="hover:text-foreground hover:underline"
          to={'/roadmaps'}
        >
          roadmaps
        </Link>
        <ChevronRight />
        <Link
          className="hover:text-foreground hover:underline"
          to={'/roadmaps/' + slug}
        >
          {slug}
        </Link>
        {/* {params.thingstodo && <ChevronRight />}
        <Link
          className="hover:text-foreground hover:underline"
          to={"/roadmaps/" + params.province}
        >
          {params.thingstodo}
        </Link> */}
      </div>
      <div
        className={cn(
          '-mx-12 mt-3 flex h-[470px] flex-col bg-cover bg-center md:flex-row'
        )}
        style={{ backgroundImage: `url(${province?.image})` }}
      >
        <div className="flex w-full flex-col items-start space-y-2 bg-gradient-to-b from-black/90 to-transparent px-8 pt-5 md:px-12">
          <h2 className="text-white">{province?.name}</h2>
          <span className="text-gray-300">{province?.description}</span>
          <Button asChild>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={province?.mapsUrl || ''}
            >
              <Map />
              <span className="ml-2">Bản đồ</span>
            </Link>
          </Button>
        </div>
        {/* <img
          className="mt-5 w-full rounded object-cover md:ml-6 md:mt-0 md:w-[500px]"
          src={province?.image}
        /> */}
      </div>
      <div className="mt-5">
        <h4>Điểm du lịch</h4>
        <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-5">
          {province?.thingsToDo.map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger>
                <Card className="group flex h-24 cursor-pointer items-center justify-center p-5 text-center text-sm hover:border-foreground md:text-base">
                  <span className="transition-all group-hover:scale-[1.1]">
                    {item.name}
                  </span>
                </Card>
              </DialogTrigger>
              <DialogContent className="h-screen w-screen sm:h-fit">
                <DialogHeader>
                  <DialogTitle>{item.name}</DialogTitle>
                  <DialogDescription>{item.description}</DialogDescription>
                </DialogHeader>
                <img
                  className="h-[340px] w-full object-cover"
                  src={item.image}
                />
                <Button asChild>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={item?.mapsUrl || ''}
                    className="space-x-2"
                  >
                    <Map />
                    <span>Maps</span>
                  </Link>
                </Button>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}
