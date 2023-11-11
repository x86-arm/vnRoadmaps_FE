import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Demo } from '@/assets';
import Modal from '@/components/Modal';
import Footer from '@/layouts/components/Footer';

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <main className="flex h-screen flex-1 justify-center">
        <div className="relative max-w-[1524px] px-8">
          <section className="flex flex-col justify-center px-4 pb-8 pt-8 md:flex-row md:pt-12">
            <div className="flex flex-col items-start gap-5 md:items-center">
              <Link
                to="#"
                className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
              >
                🎉 <div className="mx-2 h-4 w-[1px] shrink-0 bg-border" /> Open
                beta với 5 tỉnh thành. <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
              <h1>
                Chuẩn bị cho chuyến khám phá{' '}
                <strong className=" bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 bg-clip-text text-transparent">
                  Việt Nam
                </strong>{' '}
                của bạn
              </h1>
              <span className="h4 font-normal text-muted-foreground">
                vnRoadmaps sẽ cho bạn những chỉ dẫn và lựa chọn tốt nhất khi bạn
                muốn khám phá các tỉnh thành tại Việt Nam!
              </span>
              <div>
                <Button asChild>
                  <Link to={'/login'}>Trải nghiệm ngay</Link>
                </Button>
                <Button
                  variant="gradient"
                  className="ml-5"
                  onClick={() => setIsOpen(true)}
                >
                  Xem demo
                </Button>
              </div>
              <div
                className="relative mt-5 flex w-full items-center justify-center rounded md:w-[50vw]"
                onClick={() => setIsOpen(true)}
              >
                <PlayCircle className="absolute h-12 w-12" />
                <img src={Demo} alt="demo image" />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <iframe
          className="h-[60vh] w-[80vw]"
          src="https://www.youtube-nocookie.com/embed/wjGnNJzmL7c"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </Modal>
    </div>
  );
}
