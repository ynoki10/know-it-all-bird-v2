import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Input from './components/Input';
import Result from './components/Result';
import Thinking from './components/Thinking';
import Top from './components/Top';
import { useGenerateExplanation } from './hooks/useGenerateExplanation';
import { pageAtom } from './stores/atoms';
import setVhCssVar from './utils/viewport';

function App() {
  const page = useAtomValue(pageAtom);
  const { checkAvailability } = useGenerateExplanation();
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setVhCssVar();
    checkAvailability().then(setAiAvailable);
  }, []);

  return (
    <div className="mx-auto flex min-h-[var(--vh-full,100vh)] max-w-xl flex-col items-center justify-between">
      <Header />
      <main className="flex w-full flex-col gap-y-5 px-4 py-8 text-base leading-6 text-gray-800">
        {aiAvailable === false && page !== 'top' ? (
          <div className="text-center">
            <img
              alt="文鳥さんのイラスト"
              src="/bird_bunchou_white.png"
              className="mx-auto mb-4"
              width={140}
              height={140}
            />
            <p className="text-sm text-gray-600">
              このアプリは Chrome Built-in AI を使用しています。
              <br />
              Chrome（デスクトップ版）の最新バージョンでご利用ください。
            </p>
          </div>
        ) : (
          <>
            {page === 'top' && <Top />}
            {page === 'input' && <Input />}
            {page === 'thinking' && <Thinking />}
            {page === 'result' && <Result />}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
