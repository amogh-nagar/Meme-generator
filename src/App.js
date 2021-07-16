import {useEffect, useState} from "react";
import Meme from "./components/Meme";
import Header from "./components/Header";
import Loading from "./components/Loading";
function App() {
  const [memes, setmemes] = useState([]);
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    const fecthmemes = async () => {
      setisloading(true);
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      console.log("data", data);
      setmemes(data.data.memes);
      setisloading(false);
    };
    fecthmemes();
  }, []);

  const [showmeme, setshowmeme] = useState(null);
  console.log(memes);
  const clickhandler = (meme) => {
    console.log("Clicked meme");

    setshowmeme(meme);
  };

  return (
    <>
      <Header />
      {isloading && <Loading />}
      {!isloading && (
        <div className="app">
          <ul className="list">
            {memes.map((meme) => (
              <li
                key={meme.id}
                className="meme"
                onClick={clickhandler.bind(null, meme)}
              >
                <div
                  style={{backgroundImage: `url(${meme.url})`}}
                  className="meme_image"
                ></div>
                <div className="meme_name">{meme.name}</div>
              </li>
            ))}
          </ul>

          {showmeme !== null && <Meme meme={showmeme} onClick={clickhandler} />}
        </div>
      )}
    </>
  );
}

export default App;
