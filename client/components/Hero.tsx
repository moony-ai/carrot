'use client';

//import Image from 'next/image';
import NavLink from './NavLink';

let heroImages = ['/1.png', '/6.png', '/3.png', '/4.png', '/5.png', '/2.png'];

export default function Hero() {
  return (
    <section>
      <div className="custom-screen pt-28 text-gray-600">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl">
          <span style={{ lineHeight: '1.2' }}>당신의 비즈니스 소식,</span>
            <br />
            <span style={{ lineHeight: '1.2' }}>지금 바로 만들어보세요</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg">
            CarrotAI로 멋진 비즈니스 소식을 만들어보세요.
          </p>
          <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
            <NavLink
              href="/start"
              className="text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900 "
            >
              비즈니스 소식 생성
            </NavLink>
            <NavLink
              target="_blank"
              href="https://github.com/moony-ai/carrot"
              className="text-gray-700 border hover:bg-gray-50"
              scroll={false}
            >
              더보기
            </NavLink>
          </div>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 pt-10">
            {heroImages.map((image, idx) => (
              <img
                key={idx}
                alt="image"
                src={image}
                width={500}
                height={500}
                className="rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
