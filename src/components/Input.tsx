import { useSetAtom } from 'jotai';
import { useState } from 'react';

import { firstWords, secondWords } from '../constants/words';
import { useGenerateExplanation } from '../hooks/useGenerateExplanation';
import { isLoadingAtom, pageAtom, resultAtom, wordAtom } from '../stores/atoms';
import Button from './Button';
import Toggle from './Toggle';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className="h-4 w-4"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
  </svg>
);

const Input = () => {
  const { generate } = useGenerateExplanation();
  const setPage = useSetAtom(pageAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);
  const setResult = useSetAtom(resultAtom);
  const setWord = useSetAtom(wordAtom);

  const [isFreeInput, setIsFreeInput] = useState(false);
  const [displayFirstWords, setDisplayFirstWords] = useState(() => shuffleArray(firstWords).slice(0, 4));
  const [displaySecondWords, setDisplaySecondWords] = useState(() => shuffleArray(secondWords).slice(0, 4));
  const [firstWordNum, setFirstWordNum] = useState<number | null>(null);
  const [secondWordNum, setSecondWordNum] = useState<number | null>(null);
  const [inputWord, setInputWord] = useState('');

  const refreshWords = () => {
    setDisplayFirstWords(shuffleArray(firstWords).slice(0, 4));
    setDisplaySecondWords(shuffleArray(secondWords).slice(0, 4));
    setFirstWordNum(null);
    setSecondWordNum(null);
  };

  const selectedWord = `${firstWordNum !== null ? displayFirstWords[firstWordNum] : ''}${
    secondWordNum !== null ? displaySecondWords[secondWordNum] : ''
  }`;

  const canSubmit = isFreeInput
    ? inputWord.length >= 4 && inputWord.length <= 12
    : firstWordNum !== null && secondWordNum !== null;

  const onClick = () => {
    const word = isFreeInput ? inputWord : selectedWord;
    setIsLoading(true);
    setPage('thinking');
    setWord(word);

    const handleSubmit = async () => {
      try {
        const result = await generate(word);
        setResult(result);
      } finally {
        setIsLoading(false);
      }
    };
    void handleSubmit();
  };

  return (
    <>
      <h2 className="text-center text-2xl font-bold text-gray-900">
        どんなことわざについて
        <br />
        知りたいですか？
      </h2>
      <img alt="文鳥さんのイラスト" src="/bird_bunchou_white.png" className="mx-auto" width={140} height={140} />
      <div>
        <div className="flex gap-7">
          <div className="flex w-full flex-col gap-y-4">
            {displayFirstWords.map((word, index) => (
              <button
                key={word}
                type="button"
                onClick={() => setFirstWordNum(index)}
                className={`flex w-full cursor-pointer items-center justify-center rounded-full border-0 py-2 text-sm font-bold ${
                  firstWordNum === index ? 'bg-button-selected' : 'bg-button-gray'
                }`}
              >
                {word}
              </button>
            ))}
          </div>
          <div className="flex w-full flex-col gap-y-4">
            {displaySecondWords.map((word, index) => (
              <button
                key={word}
                type="button"
                onClick={() => setSecondWordNum(index)}
                className={`flex w-full cursor-pointer items-center justify-center rounded-full border-0 py-2 text-sm font-bold ${
                  secondWordNum === index ? 'bg-button-selected' : 'bg-button-gray'
                }`}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={refreshWords}
          className="ml-auto mt-4 grid h-6 w-6 place-items-center rounded-md bg-slate-200"
        >
          <RefreshIcon />
        </button>
      </div>
      <div>
        {isFreeInput ? (
          <>
            <input
              className="mb-2 block w-full rounded border border-gray-400 px-4 py-3 text-center text-base leading-6 text-gray-800 placeholder:text-gray-600 placeholder:opacity-100"
              type="text"
              name="prompt"
              placeholder=""
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
            />
            {inputWord && (inputWord.length < 4 || inputWord.length > 12) && (
              <p className="text-center text-xs text-red-700">4~12文字で入力してください</p>
            )}
          </>
        ) : (
          <p className="mb-2 w-full rounded border border-gray-400 px-4 py-3 text-center text-base leading-6 text-gray-800">
            <span className="inline-block min-h-[1em]">{selectedWord}</span>
          </p>
        )}
        <Toggle checked={isFreeInput} onChange={setIsFreeInput} label="自由に入力する" />
      </div>

      <Button text="文鳥さんに聞いてみる" onClick={onClick} disabled={!canSubmit} />
    </>
  );
};

export default Input;
