/* eslint-disable react/prop-types */
import { useState } from "react"
import { Loader, FormField, RenderCards } from "../components";

function Home() {
  const [searchText, setSearchText] = useState('');
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      let generate = `https://api.unsplash.com/search/photos?query=${searchText}&client_id=fGWc4KjqssSdo7FEw9xoFGHq9vxPDwm5Cz8ZufqfMMU`;
      const response = await fetch(generate);

      if (response.ok) {
        const data = await response.json();
        setImg(data.results);
      }
    }
    catch (err) {
      alert(err);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-5xl mx-auto">
      <div>
        <h1 className="font-bold text-xl text-[#4880f0]">Find Free Images</h1>
        <p className="text-xs text-gray-700 max-w-[500px]">Search for imaginative and visually stunning images</p>
      </div>

      <div className="mt-10 max-w-3xl">
        <FormField
          type='text'
          name="text"
          value={searchText}
          placeholder='Search something...'
          handleChange={(e) => {
            setSearchText(e.target.value);
          }}
          handleClick={handleClick}
          btn={true}
        />
      </div>

      <div className="mt-16">
        {loading ?
          <div className="flex justify-center items-center">
            <Loader />
          </div>
          : <>
            {searchText &&
              <h1 className="font-medium text-md text-gray-500 mb-3">
                Showing Results for <span className="text-gray-900 text-lg">{searchText}</span>
              </h1>
            }
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-1">
              <RenderCards
                data={img}
                title="No Results"
              />
            </div>
          </>
        }
      </div>
    </section>
  )
}

export default Home