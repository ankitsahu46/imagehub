import { surpriseMeText } from "../constants";
import fileSaver from 'file-saver';


export const generateRandomText = (text) => {
  const randomNum = Math.floor(Math.random() * surpriseMeText.length);
  const randomText = surpriseMeText[randomNum];

  if (randomText === text) return generateRandomText();

  return randomText;
}

export const downloadImg = (id, photo) => {
  fileSaver.saveAs(photo, `download-${id}.jpg`);
}

export const sharePhoto = async (photoName, photoUrl, yourName, setFunc) => {
  if (photoName && photoUrl && yourName) {
    try {
      setFunc("sharing");
      const response = await fetch('http://localhost:5000/post', {
        method: 'POST',
        body: JSON.stringify({name: yourName, text: photoName, photo: photoUrl}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await response.json();
      setFunc("shared");
      return "success";
      // setTimeout(() => {
      //   navigate('/shared-posts');
      // }, 1000);
    }
    catch (err) {
      console.log(err);
      alert("Couldn't Share. Please try again");
      setFunc('share');
    }
  }
  else {
    alert("Please fill all the info and generate the image then share!");
  }
}