"use client";
import { useState } from "react";
import { SearchMake } from "./";
import Image from "next/image";
import { useRouter } from "next/navigation";
const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      width={40}
      height={40}
      alt='magnifying glass'
      src='/magnifying-glass.svg'
      className='object-contain'
    />
  </button>
);
const SearchBar = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearchParams(make.toLocaleLowerCase(), model.toLocaleLowerCase());
  };
  const updateSearchParams = (make: string, model: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) searchParams.set("model", model);
    else searchParams.delete("model");
    if (make) searchParams.set("make", make);
    else searchParams.delete("make");

    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathName, { scroll: false });
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchMake make={make} setMake={setMake} />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='car model'
        />
        <input
          type='text'
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder='Tiguan...'
          className='searchbar__input'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  );
};

export default SearchBar;
