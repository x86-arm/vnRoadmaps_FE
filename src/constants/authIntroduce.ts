import { hanoiBeefNoodleSoup, hanoiBeefNoodleSoup2 } from "@/assets";

export interface AuthIntroduce {
  image: string[];
  description: {
    [lang: string]: string;
  };
}

export const authIntroduce: AuthIntroduce[] = [
  {
    image: [hanoiBeefNoodleSoup, hanoiBeefNoodleSoup2],
    description: {
      en: "<strong>Pho</strong> (UK: /fɜː/, US: /fʌ/) is a Vietnamese soup dish consisting of broth, rice noodles , herbs, and meat. Phở is a popular food in Vietnam where it is served in households, street-stalls, and restaurants country-wide. Residents of the city of Nam Định were the first to create Vietnamese traditional phở. It is considered Vietnam's national dish.",
      vi: "<strong>Phở</strong> là một món ăn truyền thống của Việt Nam và được xem là một trong những món ăn tiêu biểu cho nền ẩm thực Việt Nam.",
    },
  },
];
