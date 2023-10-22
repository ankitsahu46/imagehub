/* eslint-disable react/prop-types */
import Card from "./Card";

function RenderCards({ data, title, share = false }) {
  if (data?.length > 0) 
    return (share ?
      data.map((item) => <Card key={item._id} {...item} shared={share}/>)
      :
      data.map((item) => <Card key={item.urls.full} imgs={item} shared={share}/>)
    )

  else {
  return (<h1 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h1>)
  }
}
export default RenderCards