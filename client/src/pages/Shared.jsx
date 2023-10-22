/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import { Loader, FormField, RenderCards } from "../components";

function Home() {
  const search = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    search.current = e.target.value;
    
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = images.filter((image) => image.name.toLowerCase().includes(search.current.toLowerCase()) || image.text.toLowerCase().includes(search.current.toLowerCase()))
        console.log(searchResults);
        setSearchedResults(searchResults);
      }, 500)
    )
  }

  const photoData = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/post');

      if (response.ok) {
        const photos = await response.json();
        setImages(photos.data.reverse());
      }
    }
    catch (err) {
      alert(err);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    photoData();
  }, [])

  return (
    <section className="max-w-5xl mx-auto">
      <div>
        <h1 className="font-bold text-xl">The Community Showcase</h1>
        <p className="text-xs text-gray-700 max-w-[500px]">Browse through a collection of imaginative and visually stunning images</p>
      </div>

      <div className="mt-10 max-w-3xl">
        <FormField
          type='text'
          label="Search posts"
          name="text"
          value={searchText}
          placeholder='Search something...'
          handleChange={handleSearch}
          // handleClick={handleClick}
          // btn={true}
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
              {searchText ?
                <RenderCards 
                  data={searchedResults}
                  title='No Results Found' 
                  share={true}
                />
                :
                <RenderCards
                  data={images}
                  title="No Posts Yet"
                  share={true}
                />
              }
            </div>
          </>
        }
      </div>
    </section>
  )
}

export default Home