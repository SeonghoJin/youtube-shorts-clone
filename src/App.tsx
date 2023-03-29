import { youtubeUrlList } from './youtube';
import './App.css';
import { useCallback, useEffect, useRef } from 'react';
import { debounce, throttle } from 'lodash';

const YoutubeItem = ({ src }: { src: string }) => {
  const ref = useRef<HTMLIFrameElement>(null);

  return (
    <div className="w-full h-[100vh] [scroll-snap-align:start]">
      <div className="flex items-center justify-center">
        <iframe
          className=""
          ref={ref}
          width="315"
          height="600"
          src={src}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
};

function App() {
  const ref = useRef<HTMLUListElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const animationStart = (callback: () => void) => {
    if (animationRef?.current) {
      return;
    }
    callback();
    animationRef.current = setTimeout(() => {
      if (animationRef?.current) {
        clearTimeout(animationRef?.current);
        animationRef.current = null;
      }
    }, 400);
  };

  const increase = () => {
    animationStart(() => {
      ref?.current?.scrollBy({
        top: -1,
        behavior: 'smooth',
      });
    });
  };

  const decrease = () => {
    animationStart(() => {
      ref?.current?.scrollBy({
        top: 1,
        behavior: 'smooth',
      });
    });
  };

  return (
    <div className="w-full">
      <div className="fixed left-[15px] top-[50%] flex flex-col gap-[10px]">
        <button
          className="bg-slate-500 p-[10px_12px]"
          onClick={(e) => {
            increase();
          }}
        >
          UP
        </button>
        <button
          onClick={(e) => {
            decrease();
          }}
          className="bg-orange-500 p-[10px_12px]"
        >
          DOWN
        </button>
      </div>
      <div className="">
        <ul
          className="flex-col gap-[30px] m-[0_auto] overflow-y-scroll [scroll-snap-type:y_mandatory] h-[100vh] [overscroll-behavior:_none;]"
          ref={ref}
        >
          {youtubeUrlList.map((url, index) => (
            <li className=" justify-center items-center ">
              <YoutubeItem src={url} key={index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
