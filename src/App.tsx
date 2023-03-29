import { youtubeUrlList } from './youtube';
import './App.css';
import { useEffect, useRef } from 'react';

const YoutubeItem = ({ src }: { src: string }) => {
  const ref = useRef<HTMLIFrameElement>(null);

  return (
    <div className="w-full h-[100vh]">
      <div className="flex items-center justify-center">
        <iframe
          className="[scroll-snap-align:start]"
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
  return (
    <div className="w-full">
      <div className="fixed left-[15px] top-[50%] flex flex-col gap-[10px]">
        <button
          className="bg-slate-500 p-[10px_12px]"
          onClick={(e) => {
            ref?.current?.scrollBy({
              top: -1,
              behavior: 'smooth',
            });
          }}
        >
          UP
        </button>
        <button
          onClick={(e) => {
            ref?.current?.scrollBy({
              top: 1,
              behavior: 'smooth',
            });
          }}
          className="bg-orange-500 p-[10px_12px]"
        >
          DOWN
        </button>
      </div>
      <div className="">
        <ul
          className="flex-col gap-[30px] m-[0_auto] overflow-y-scroll [scroll-snap-type:y_mandatory] h-[100vh]"
          ref={ref}
        >
          {youtubeUrlList.map((url) => (
            <li className=" justify-center items-center ">
              <YoutubeItem src={url} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
