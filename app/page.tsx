import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import Image from "next/image";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    make: searchParams.make || "",
    year: searchParams.year || 2023,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 9,
    model: searchParams.model || "",
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'> Car Catalogue</h1>

          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <div className='home__filter-container'>
              <CustomFilter title='fuel' options={fuels} />
              <CustomFilter title='year' options={yearsOfProduction} />
            </div>
            {!isDataEmpty ? (
              <section>
                <div className='home__cars-wrapper'>
                  {allCars?.map((car) => (
                    <CarCard car={car} />
                  ))}
                </div>
                <ShowMore
                  pageNumber={searchParams.limit || 9}
                  isNext={(searchParams.limit || 9) > allCars.length}
                />
              </section>
            ) : (
              <div className='home__cars-wrapper'>
                <h2 className='text-black text-xl font-bold'>
                  Ooops, n cars:<p>{allCars?.message}</p>{" "}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
