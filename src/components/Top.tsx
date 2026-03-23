import { useSetAtom } from 'jotai';

import { pageAtom } from '../stores/atoms';
import Button from './Button';

const Top = () => {
  const setPage = useSetAtom(pageAtom);

  return (
    <>
      <h2 className="text-center text-2xl font-bold text-gray-900">ことわざにくわしい文鳥さん</h2>
      <img
        alt="文鳥さんのイラスト"
        src="/bird_bunchou_white.png"
        className="mx-auto"
        width={140}
        height={140}
      />
      <p className="w-full">
        ことわざにくわしい文鳥さんにことわざについて教えてもらいましょう。
        <br />
        文鳥さんはどんなことわざでも知っています。
      </p>
      <Button text="はじめる" onClick={() => setPage('input')} />
    </>
  );
};

export default Top;
