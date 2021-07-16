import ReactDOM from "react-dom";
import {useState} from "react";
import {saveAs} from 'file-saver'


const Backdrop = ({clicky}) => {
  return (
    <div
      onClick={() => {
     console.log('logged');
        clicky(null);
      }}
      className="style_backdrop"
    ></div>
  );
};

const Memegenerator = ({meme}) => {
  const [req, setreq] = useState({
    template_id: meme.id,
    username: "AMOGHNAGAR",
    password: "123mamta",
    boxes: [],
  });

  const [newmeme, setnewmeme] = useState(meme);


const downloadhandler=(url)=>{
    saveAs(url,'image.jpg')
}





  const submithandler = async (e) => {
    e.preventDefault();
    console.log(req);
    let url = `https://api.imgflip.com/caption_image?template_id=${req.template_id}&username=${req.username}&password=${req.password}`;
    req.boxes.forEach((box, index) => {
      url += `&boxes[${index}][text]=${box.text}`;
    });
    const res = await fetch(url);
    console.log(res.url);
    const data = await res.json();
    console.log(data);
    setnewmeme((prevstate) => {
      return {
        ...prevstate,
        url: data.data.url,
      };
    });
  };

  return (
    <form className="singlememe" onSubmit={submithandler}>
      <h1>{newmeme.name}</h1>
      <div
        className="signlememe_imagecontainer"
        style={{backgroundImage: `url(${newmeme.url})`}}
      >
          <img src={newmeme.url}  alt="New meme" />
      </div>
      {[...Array(newmeme.box_count)].map((i, index) => (
        <div key={index} className="input_box">
          <span>{index}.</span>
          <input
            onChange={(event) => {
              const newbox = [...req.boxes];
              newbox[index] = {text: event.target.value};
              setreq((prevstate) => {
                return {
                  ...prevstate,
                  boxes: newbox,
                };
              });
            }}
            type="text"
            className="input"
          />
        </div>
      ))}

      <button type="submit" className="btn">
        Get Meme
      </button>
      <button onClick={downloadhandler.bind(null,newmeme.url)} type="button" className="download-btn">
        Download Meme
      </button>
    </form>
  );
};

const Meme = ({meme, onClick}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop clicky={onClick} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <Memegenerator meme={meme} />,
        document.getElementById("backdrop")
      )}
    </>
  );
};

export default Meme;
