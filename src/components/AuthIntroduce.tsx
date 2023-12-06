import { AuthIntroduce, authIntroduce } from '@/constants/authIntroduce';
import Logo from './Logo';

export default function AuthIntroduce() {
  const getAuthIntroduceItem = () => {
    const authIntroduceItem: AuthIntroduce =
      authIntroduce[Math.floor(Math.random() * authIntroduce.length)];

    const img =
      authIntroduceItem.image[
        Math.floor(Math.random() * authIntroduceItem.image.length)
      ];

    const description = authIntroduceItem.description['vi'];

    return { img, description };
  };

  const authIntroduceItem = getAuthIntroduceItem();
  return (
    <div className="hidden w-full flex-col justify-between bg-zinc-900 p-10 text-white dark:border-r md:flex">
      <Logo className="h4" />
        <img 
          alt="hanoi-beef-noodle-soup"
          src={authIntroduceItem.img}
          className="rounded-md object-cover w-"
        />
      <p dangerouslySetInnerHTML={{ __html: authIntroduceItem.description }} />
    </div>
  );
}
