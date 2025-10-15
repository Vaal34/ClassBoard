import React from 'react'

const Folder = () => {
  return (
    <section className="group relative flex h-full w-full flex-col items-center justify-center">
      <div className="file relative z-50 h-32 w-48 sm:h-36 sm:w-56 md:h-40 md:w-60 lg:h-44 lg:w-64 xl:h-48 xl:w-72 origin-bottom cursor-pointer [perspective:1500px]">
        <div className="work-5 ease relative h-full w-full origin-top rounded-2xl rounded-tl-none bg-amber-600 transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] after:absolute after:bottom-[99%] after:left-0 after:h-3 after:w-16 sm:after:h-3.5 sm:after:w-18 md:after:h-4 md:after:w-20 lg:after:h-4.5 lg:after:w-22 xl:after:h-5 xl:after:w-24 after:rounded-t-2xl after:bg-amber-600 after:content-['']" />
        <div className="work-4 ease absolute inset-1 origin-bottom rounded-2xl bg-zinc-400 transition-all duration-300 select-none group-hover:[transform:rotateX(-20deg)]" />
        <div className="work-3 ease absolute inset-1 origin-bottom rounded-2xl bg-zinc-300 transition-all duration-300 group-hover:[transform:rotateX(-30deg)]" />
        <div className="work-2 ease absolute inset-1 origin-bottom rounded-2xl bg-zinc-200 transition-all duration-300 group-hover:[transform:rotateX(-38deg)]" />
        <div className="work-1 ease absolute bottom-0 flex h-[120px] sm:h-[135px] md:h-[156px] lg:h-[170px] xl:h-[185px] w-full origin-bottom items-end rounded-2xl rounded-tr-none bg-gradient-to-t from-amber-500 to-amber-400 transition-all duration-300 group-hover:[transform:rotateX(-46deg)_translateY(1px)] group-hover:shadow-[inset_0_20px_40px_#fbbf24,_inset_0_-20px_40px_#d97706] after:absolute after:right-0 after:bottom-[99%] after:h-[12px] after:w-[110px] sm:after:h-[14px] sm:after:w-[125px] md:after:h-[16px] md:after:w-[146px] lg:after:h-[18px] lg:after:w-[165px] xl:after:h-[20px] xl:after:w-[180px] after:rounded-t-2xl after:bg-amber-400 after:content-['']" />
      </div>
    </section>
  )
}

export default Folder
