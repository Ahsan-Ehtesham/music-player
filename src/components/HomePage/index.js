import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import Logo from "assets/images/mysfits_banner.gif";
import HipHop from "assets/images/hiphop.png";
import RNB from "assets/images/rnb.png";
import Rock from "assets/images/rock.png";
import MusicPlayer from "components/MusicPlayer";
import Search from "./Search";
import getPlaylist from "data/playlist";

const categoryList = [
  {
    id: "hiphop",
    name: "Hip-Hop",
    image: HipHop,
    description:
      "Hip hop or hip-hop is a culture and art movement that was created by African Americans, Latino Americans and Caribbean Americans in the Bronx, New York City. The origin of the name is often disputed. It is also argued as to whether hip hop started in the South or West Bronx.",
  },
  {
    id: "rnb",
    name: "R&B",
    image: RNB,
    description:
      "Rhythm and blues, often abbreviated as R&B, is a genre of popular music that originated in African-American communities in the 1940s.",
  },
  {
    id: "rock",
    name: "Rock",
    image: Rock,
    description:
      "Rock music is a broad genre of popular music that originated as 'rock and roll' in the United States in the late 1940s and early 1950s, developing into a range of different styles in the mid-1960s and later, particularly in the United States and the United Kingdom.",
  },
];

const HomePage = () => {
  const [musicOpen, setMusicOpen] = useState(false);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentCategoryList, setCurrentCategoryList] = useState(
    () => categoryList || []
  );

  const handleOpenMusicPlayer = (e, categoryId) => {
    e.preventDefault();
    setSelectedCategory(categoryId);
    setPlaylist(getPlaylist(categoryId));
    setMusicOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseMusicPlayer = () => {
    setMusicOpen(false);
    setSelectedCategory(null);
    document.body.style.overflow = "unset";
  };

  const handleSearchCallback = (result) => {
    const catId = result[0].category;
    const playlist = getPlaylist(catId);
    const songIndex = playlist.findIndex(
      (elem) => elem.name === result[0].name
    );
    setCurrentMusicIndex(songIndex);
    setPlaylist(getPlaylist(catId));
    setSelectedCategory(catId);
    setMusicOpen(true);
    document.body.style.overflow = "hidden";
  };

  const getCorrespondingCategoryName = (catId) => {
    const filteredData = categoryList?.filter(
      (category) => category.id === catId
    );
    if (filteredData?.length > 0) {
      return filteredData[0].name;
    } else {
      return "Music Playlist";
    }
  };

  return (
    <>
      <header className="header">
        {/* <div className="logo">Music Player</div> */}

        <div>
          <img src={Logo} className="img-fluid" alt="logo" />
        </div>
      </header>
      <section className="hero">
        <p className="first-text">
          We, at Mythical Mysfits believe that all creatures deserve a second
          chance...
        </p>
        <p className="second-text">
          Even if they spent their first chance hiding under bridges and
          unapologetically robbing helpless travelers.
        </p>
        <p className="third-text">
          Browse the creatures below and find a match that will set your heart
          on fire!
        </p>
      </section>
      <section className="container-fluid container-wrapper">
        <Search handleSearchCallback={handleSearchCallback} />

        {currentCategoryList?.length > 0 ? (
          <div className="row">
            {currentCategoryList?.map((eachCategory) => (
              <div className="col-sm-4 category-wrapper" key={eachCategory.id}>
                <div className="category-name">{eachCategory.name}</div>
                <div className="category-image-container">
                  <img
                    src={eachCategory.image}
                    alt="hiphop"
                    className="category-image"
                  />
                </div>
                <button
                  className="btn btn-primary mb-4"
                  onClick={(e) => handleOpenMusicPlayer(e, eachCategory.id)}
                >
                  Play Music
                </button>
                <p className="category-description">
                  {eachCategory.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <h4>No results found!</h4>
        )}
      </section>
      <footer>
        <span>
          This website and I do not claim any right over any of the graphics,
          images, songs used in this video. All rights reserved to the
          respective copyright owners.
        </span>
      </footer>
      <Modal
        closeTimeoutMS={200}
        isOpen={musicOpen}
        onRequestClose={handleCloseMusicPlayer}
        contentLabel="Music Player"
        className="modal-style"
      >
        <div className="modal-content-wrapper">
          <div className="d-flex justify-content-between align-items-center cursor-pointer p-2">
            <h4 className="modal-title">
              {getCorrespondingCategoryName(selectedCategory)}
            </h4>
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleCloseMusicPlayer}
            >
              Go Back
            </button>
          </div>
          <MusicPlayer
            playlist={playlist}
            currentMusicIndex={currentMusicIndex}
          />
        </div>
      </Modal>
    </>
  );
};

export default HomePage;

Modal.setAppElement("#root");
