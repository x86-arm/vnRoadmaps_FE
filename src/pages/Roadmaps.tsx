import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import SearchResult from '@/components/SearchResult';
import { provinceServices } from '@/services/provinceServices';
import { useDispatch } from 'react-redux';
import { AppDispatch, store } from '@/store';
import { info } from '@/store/reducers/userReducer';
import { unwrapResult } from '@reduxjs/toolkit';

export default function Roadmaps() {
  const [searchInput, setSearchInput] = useState('');
  const [provinces, setProvinces] = useState<
    { name: string; slug: string; image: string }[] | []
  >([]);
  const [userInfo, setUserInfo] = useState<Session>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    provinceServices
      .getProvincesSlug(
        store.getState().userReducer.tokens.accessToken || undefined
      )
      .then((res) => setProvinces(res.data))
      .catch(() => setProvinces([]));
    dispatch(info(null))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        setUserInfo(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError: any) => {
        console.log(rejectedValueOrSerializedError);
      });
  }, []);

  const filteredData = provinces.filter((el) => {
    if (searchInput === '') {
      return el;
    } else {
      return el.name.toLowerCase().includes(searchInput.toLowerCase());
    }
  });

  return (
    <div>
      <main className="flex h-screen flex-1 justify-center">
        <div className="relative max-w-[1524px] px-8">
          <section className="flex flex-col justify-center px-4 pb-8 pt-8 md:flex-row md:pt-12">
            <div className="flex flex-col items-center">
              <div className="flex w-fit flex-col items-start gap-5 md:items-center">
                <h2>
                  xin chào{' '}
                  <span className="bg-gradient-to-tr from-zinc-300 to-emerald-400 bg-clip-text text-transparent">
                    {userInfo?.fullname}
                  </span>
                </h2>
                <h1>
                  mùa hè này bạn muốn đi đâu
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 bg-clip-text text-transparent"
                  >
                    ?
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 bg-clip-text text-transparent"
                  >
                    ?
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 bg-clip-text text-transparent"
                  >
                    ?
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 bg-clip-text text-transparent"
                  >
                    ?
                  </motion.span>
                </h1>
                {/* <span className="h4 font-normal text-muted-foreground">
                Đến với vnRoadmaps, bạn sẽ có được những chỉ dẫn tốt nhất để
                chuẩn bị cho chuyến đi của mình
              </span> */}
                <div className="relative w-full">
                  <Input
                    placeholder="tìm kiếm chỉ dẫn về tỉnh thành mà bạn muốn đến"
                    className="inset-0 block h-14 w-full rounded-lg border text-sm"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  {/* <div className=" text-md absolute bottom-2 right-2 inline-flex h-10 items-center justify-center rounded bg-muted px-2 font-medium ">
                  tìm kiếm
                </div> */}
                </div>
              </div>
              <SearchResult results={filteredData} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
