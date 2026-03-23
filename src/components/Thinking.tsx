import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { isLoadingAtom, pageAtom, wordAtom } from '../stores/atoms';

const Thinking = () => {
  const word = useAtomValue(wordAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  const setPage = useSetAtom(pageAtom);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setPage('result');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, setPage]);

  return (
    <>
      <h2 className="text-center text-2xl font-bold text-gray-900">{word}</h2>
      <div>
        <div className="relative mx-auto h-20 w-36">
          {isLoading ? (
            <>
              <img
                alt=""
                src="/question.png"
                className="absolute bottom-0 left-0 block h-auto w-14 -rotate-[20deg] animate-blink [animation-delay:1s]"
                width={251}
                height={344}
              />
              <img
                alt=""
                src="/question.png"
                className="absolute bottom-0 right-6 block h-auto w-14 rotate-[15deg] animate-blink"
                width={251}
                height={344}
              />
            </>
          ) : (
            <img
              alt=""
              src="/hirameki.png"
              className="absolute left-5 top-0 block h-auto w-14"
              width={357}
              height={469}
            />
          )}
        </div>
        <img
          alt="文鳥さんのイラスト"
          src="/bird_bunchou_white.png"
          className="mx-auto"
          width={140}
          height={140}
        />
      </div>
      <div>
        <p className="mt-4 text-center text-sm font-bold">文鳥さんが一生懸命考えています</p>
        <p className="mt-4 text-center text-xs">※少々お待ちください</p>
      </div>
    </>
  );
};

export default Thinking;
