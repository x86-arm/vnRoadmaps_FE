import React, { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { LogOut, SettingsIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import authServices from '@/services/authServices';
import { Link } from 'react-router-dom';

export default function Menu({
  children,
}: //   menuItems,
{
  children: React.ReactNode;
  //   menuItems: MenuItems;
}) {
  const [onLogout, setOnLogout] = useState(false);
  const handleLogout = () => {
    setOnLogout(true);
    authServices
      .logout()
      .then(() => {
        setOnLogout(true);
        window.location.reload();
      })
      .catch(() => setOnLogout(false));
  };

  return (
    <Tippy
      delay={[0, 500]}
      offset={[12, 12]}
      interactive
      arrow={true}
      hideOnClick={false}
      placement="bottom-end"
      render={(attrs) => (
        <div className="" tabIndex={-1} {...attrs}>
          <a className="" data-popper-arrow="">
            {/* <TopArrowIcon className="absolute -top-2 block h-2 w-6 text-white" /> */}
          </a>
          <ul className="min-w-[223px] rounded-md border bg-background py-2 font-semibold leading-[22px] shadow-[#0000001f_0px_4px_16px] ">
            <li className="cursor-pointer p-0 hover:bg-muted">
              <Link
                to={'/infochange'}
                className="flex items-center p-[10px_8px_10px_16px]"
              >
                <SettingsIcon />
                <span className="ml-[6px] text-[16px]">Thay đổi thông tin</span>
              </Link>
            </li>
            <Dialog>
              <DialogTrigger asChild>
                <li className="cursor-pointer border-t p-0 hover:bg-muted">
                  <a className="flex items-center p-[10px_8px_10px_16px]">
                    <LogOut />
                    <span className="ml-[6px] text-[16px]">Đăng xuất</span>
                  </a>
                </li>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Bạn muốn đăng xuất?</DialogTitle>
                  <Button onClick={handleLogout} disabled={onLogout}>
                    Xác nhận
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </ul>
        </div>
      )}
    >
      <div>{children}</div>
    </Tippy>
  );
}
