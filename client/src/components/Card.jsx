/* eslint-disable react/prop-types */

import { useState } from 'react';
import { download, sharePng, successPng } from '../assets';
import { downloadImg } from '../utils';
import { sharePhoto } from '../utils';

const Card = ({ imgs, _id, name, text, photo, shared = false }) => {
  const imgName = shared ? text : imgs.user.name;
  const url = shared ? photo : imgs.urls.full;
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState('share');
  const [success, setSuccess] = useState(false);

  const handleShare = async () => {
    const result = await sharePhoto(imgName, url, "krishna", setLoading);
    console.log(result);
    if (result === "success") setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }

  return (
    <div className="rounded-xl flex justify-center items-center group relative m-1">
      <img
        className="w-full object-cover rounded-xl shadow-xl "
        src={url}
        alt="img"
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 m-1 bg-gray-900 bg-opacity-70  p-2 px-4 rounded-lg">
        <p className="text-white text-sm overflow-y-auto text">{imgName}</p>

        <div className="mt-3 flex justify-between bl items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-red-600 flex justify-center items-center text-white text-xs font-bold">K</div>
            <p className="text-white text-sm">{name}</p>
          </div>

          <div className='gap-2 flex justify-center items-center'>

            <button type="button" onClick={() => downloadImg(shared ? _id : imgName, url)} className="outline-none bg-transparent border-none">
              <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
            </button>
            {!shared &&
              <button type="button" onClick={handleShare} className="outline-none bg-transparent border-none">
                <img src={success ? successPng : sharePng} alt="download" className="w-6 h-6 object-contain invert" />
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
};

export default Card;