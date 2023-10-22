/* eslint-disable react/prop-types */

function FormField({ name, label, placeholder, handleChange, handleClick, value, handleSurpriseMe, surpriseme = false, btn=false }) {
  return (
    <div className="flex flex-col mb-3">
      <div>
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-800 ml-2"
        >
          {label}
        </label>
        {surpriseme &&
          <button type='button' className="text-xs border border-gray-400 px-2 ml-3 bg-gray-200 rounded-lg text-gray-700" onClick={handleSurpriseMe}
          >
            surprise me
          </button>
        }
      </div>

      <div className="flex w-full">
      <input
        type='text'
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className="p-2 font-medium rounded-lg border w-1/2 border-gray-300 bg-gray-50 text-gray-900 text-sm outline-none block max-w-lg focus:ring-[#6469ff] focus:border-[#6469ff]"
        required />
        {btn === true &&
        <button onClick={handleClick} className="bg-blue-600 font-inter text-white rounded-lg text-sm px-6 py-1 ml-2">Go</button>
        }
        </div>
    </div>
  )
}

export default FormField