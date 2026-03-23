import { useSetAtom } from 'jotai';

import { pageAtom } from '../stores/atoms';

const Footer = () => {
  const setPage = useSetAtom(pageAtom);

  return (
    <footer className="flex w-full flex-col items-center justify-center bg-palegreen pb-4 pt-2">
      <button type="button" className="block" onClick={() => setPage('top')}>
        <img
          className="block h-auto max-w-[128px]"
          src="/logo.png"
          width={429}
          height={141}
          alt="kotowaza buncho-san"
        />
      </button>
      <p className="mt-2 text-[15px] font-bold">
        By{' '}
        <a
          href="https://twitter.com/4noki10"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-orange underline"
        >
          Yoshinoki
        </a>
      </p>
    </footer>
  );
};

export default Footer;
