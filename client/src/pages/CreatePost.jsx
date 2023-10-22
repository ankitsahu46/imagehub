import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { preview, download } from "../assets";
import { FormField, Loader } from "../components";
import { generateRandomText, downloadImg, sharePhoto } from '../utils';

function CreatePost() {
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState("share");
  const [form, setForm] = useState({
    name: 'Ankit',
    text: '',
    photo: ''
  });

  // const navigate = useNavigate();

  const handleChange = (e) => {
    setLoading("share")
    setForm({ ...form, [e.target.name]: e.target.value });
  }
 
  const handleSurpriseMe = () => {
    const randomText = generateRandomText(form.text);
    setForm({ ...form, text: randomText});
  }
  
  const generateImg = async () => {

    if (form.name && form.text) {
      try {
        setGeneratingImg(true);
        let generate = `https://api.unsplash.com/search/photos?query=${form.text}&client_id=fGWc4KjqssSdo7FEw9xoFGHq9vxPDwm5Cz8ZufqfMMU`;

        const response = await fetch(generate);
        const data = await response.json();
        setForm({ ...form, photo: data.results[Math.floor(Math.random() * data.results.length)].urls.full })
      }
      catch (err) {
        alert("Something went wrong. Please try again later.")
      }
      finally {
        setGeneratingImg(false);
      }
    }
    else {
      alert("Please enter your name and the text to generate AI image!");
      document.querySelector(!form.name ? '#name' : '#text').focus();
    }
  }

  return (
    <>
      <section className="max-w-3xl mx-auto">

        <div>
          <h1 className="font-bold text-xl">Create</h1>
          <p className="text-xs text-gray-700 max-w-[500px]">Search an imaginative image and share it with the community</p>
        </div>

        <div className="mt-10" >
          <div>
            <FormField
              label='Name'
              name='name'
              placeholder='Enter your name'
              handleChange={handleChange}
              value={form.name}
            />
            <FormField
              label='Text'
              name='text'
              placeholder='Enter discription for the image'
              handleChange={handleChange}
              value={form.text}
              text={form.text}
              surpriseme={true}
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="relative w-96 h-96 border mt-8 flex items-center justify-center rounded-lg">
              {form.photo ?
                <img src={form.photo} alt={form.text} className="w-full h-full object-contain" />
                : <img src={preview} alt="generated image" className="w-9/12 h-9/12 object-contain opacity-30" />
              }
              {
                generatingImg ?
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)] rounded-lg">
                  <Loader />
                </div>
                : 
                form.photo !== '' && 
                <div className="w-8 h-8 absolute right-3 bottom-3 hover:w-7 hover:h-7">
                  <img src={download} onClick={() => downloadImg(form.photo, form.text)}/>
                </div>
              }
            </div>

            <div className="mt-4">
              <button type='button' className="max-w-sm w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 font-medium text-sm  rounded-lg px-4 py-2 text-white" onClick={generateImg}>
                {generatingImg ? "Generating..." : "Generate Image"}
              </button>
            </div>

            <div className="mt-8">
              <p className="text-sm mb-2 text-gray-500">
                **Once you have found your image, share it with the community**
              </p>
              <button type="submit" className="max-w-sm w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 font-medium text-sm  rounded-lg px-4 py-2 text-white" onClick={() => sharePhoto(form.text, form.photo, form.name, setLoading)}>
                {loading === "share" ? 
                  "Share with the Community"
                  :
                  loading === 'sharing' ?
                    "Sharing..."
                    :
                    "Shared"
                }
              </button>
            </div>
          </div>

        </div>

      </section>
    </>
  )
}

export default CreatePost