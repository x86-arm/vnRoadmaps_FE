import { useEffect } from 'react';
import { ThemeChanger } from '../../components/ThemeChanger';
import { HeaderNavLinks } from './HeaderNavLinks';
import { Button } from '../../components/ui/button';
import { ChevronDown, Mountain, PanelLeftOpen } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
// import { useLocale, useTranslations } from "next-intl";
// import LanguageChange from "../LanguageChange";
import Logo from '../../components/Logo';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import Menu from '../../components/Menu';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const publicPage = ['/login', '/signup'];
  // const t = useTranslations();
  const location = useLocation();
  const path = location.pathname;

  // const { stateAuthStore, dispatch } = useAuthStore();

  useEffect(() => {
    if (!publicPage.includes(path)) {
      if (path !== '/') {
        // dispatch(getUserData(""));
      }
    }
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur ${
        publicPage.includes(path) && 'hidden'
      }
  `}
    >
      <div className="mx-auto flex h-14 w-full items-center px-8">
        <Sheet>
          <SheetTrigger>
            <PanelLeftOpen className="cursor-pointer md:hidden" />
          </SheetTrigger>
          <SheetContent side={'left'}>
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <div className="flex items-center justify-between rounded-md p-3 transition-colors hover:bg-muted">
                <div className="flex">
                  <Mountain /> <span className="ml-2">Thử thách</span>
                </div>
                <ChevronDown className="" />
              </div>
              {/* <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription> */}
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div className="mr-4 hidden md:flex">
          <Logo className="items-center justify-center" />
          <HeaderNavLinks />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* <LanguageChange locale={locale} /> */}
          <ThemeChanger />
          {path == '/' ? (
            <Button variant={'outline'} asChild>
              <Link to="/login">Đăng nhập</Link>
            </Button>
          ) : (
            <Menu>
              <Avatar className="cursor-pointer">
                {/* <AvatarImage src="https://github.com/shadcn.png/" /> */}
                <AvatarFallback className="bg-muted">VM</AvatarFallback>
              </Avatar>
            </Menu>
          )}
        </div>
      </div>
    </header>
  );
}
