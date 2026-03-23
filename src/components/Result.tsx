import { useAtomValue, useSetAtom } from 'jotai';

import { pageAtom, resultAtom, wordAtom } from '../stores/atoms';
import Button from './Button';

function getRandomResultImage(): string {
  const num = Math.floor(Math.random() * 7) + 1;
  return `/result${num.toString().padStart(2, '0')}.png`;
}

const Result = () => {
  const word = useAtomValue(wordAtom);
  const result = useAtomValue(resultAtom);
  const setPage = useSetAtom(pageAtom);

  return (
    <>
      <h2 className="text-center text-2xl font-bold text-gray-900">{word}</h2>
      <img
        alt="文鳥さんのイラスト"
        src={getRandomResultImage()}
        className="mx-auto w-[140px]"
        width={202}
        height={248}
      />
      <p className="whitespace-pre-wrap rounded-md border border-gray-600 p-2">
        {result}
      </p>
      <Button text="もう一回" onClick={() => setPage('input')} />
    </>
  );
};

export default Result;
