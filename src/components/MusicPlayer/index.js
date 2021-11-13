import React, { useState, useEffect } from "react";
import Amplitude from "amplitudejs";
import "styles/music-player.css";

const MusicPlayer = ({ playlist, currentMusicIndex }) => {
  useEffect(() => {
    Amplitude.init({
      active_index: 3,
      songs: playlist,
      callbacks: {
        play: function () {
          document.getElementById("album-art").style.visibility = "hidden";
          document.getElementById("large-visualization").style.visibility =
            "visible";
        },

        pause: function () {
          document.getElementById("album-art").style.visibility = "visible";
          document.getElementById("large-visualization").style.visibility =
            "hidden";
        },
      },
      waveforms: {
        sample_rate: 50,
      },
    });

    Amplitude.skipTo(0, currentMusicIndex);

    return () => {
      Amplitude.stop();
    };
  }, [playlist, currentMusicIndex]);

  return (
    <>
      <div id="blue-playlist-container">
        <div id="amplitude-player">
          <div id="amplitude-left">
            <img
              data-amplitude-song-info="cover_art_url"
              className="album-art"
            />
            <div
              className="amplitude-visualization"
              id="large-visualization"
            ></div>
            <div id="player-left-bottom">
              <div id="time-container">
                <span className="current-time">
                  <span className="amplitude-current-minutes"></span>:
                  <span className="amplitude-current-seconds"></span>
                </span>
                <div id="progress-container">
                  <div className="amplitude-wave-form"></div>
                  <input type="range" className="amplitude-song-slider" />
                  <progress
                    id="song-played-progress"
                    className="amplitude-song-played-progress"
                  ></progress>
                  <progress
                    id="song-buffered-progress"
                    className="amplitude-buffered-progress"
                    value="0"
                  ></progress>
                </div>
                <span className="duration">
                  <span className="amplitude-duration-minutes"></span>:
                  <span className="amplitude-duration-seconds"></span>
                </span>
              </div>

              <div id="control-container">
                <div id="repeat-container">
                  <div className="amplitude-repeat" id="repeat"></div>
                  <div
                    className="amplitude-shuffle amplitude-shuffle-off"
                    id="shuffle"
                  ></div>
                </div>

                <div id="central-control-container">
                  <div id="central-controls">
                    <div className="amplitude-prev" id="previous"></div>
                    <div className="amplitude-play-pause" id="play-pause"></div>
                    <div className="amplitude-next" id="next"></div>
                  </div>
                </div>

                <div id="volume-container">
                  <div className="volume-controls">
                    <div className="amplitude-mute amplitude-not-muted"></div>
                    <input type="range" className="amplitude-volume-slider" />
                    <div className="ms-range-fix"></div>
                  </div>
                  <div
                    className="amplitude-shuffle amplitude-shuffle-off"
                    id="shuffle-right"
                  ></div>
                </div>
              </div>

              <div id="meta-container">
                <span
                  data-amplitude-song-info="name"
                  className="song-name"
                ></span>

                <div className="song-artist-album">
                  <span data-amplitude-song-info="artist"></span>
                  <span data-amplitude-song-info="album"></span>
                </div>
              </div>
            </div>
          </div>

          {playlist?.length > 0 ? (
            <div id="amplitude-right">
              {playlist?.map((eachMusic, index) => (
                <div
                  className="song amplitude-song-container amplitude-play-pause"
                  data-amplitude-song-index={`${index}`}
                  key={index}
                >
                  <div className="song-now-playing-icon-container">
                    <div className="play-button-container"></div>
                    <img
                      className="now-playing"
                      src="https://521dimensions.com/img/open-source/amplitudejs/blue-player/now-playing.svg"
                    />
                  </div>
                  <div className="song-meta-data">
                    <span className="song-title">{eachMusic.name}</span>
                    <span className="song-artist">{eachMusic.artist}</span>
                  </div>
                  <a
                    href={eachMusic.artist_link}
                    className="bandcamp-link"
                    target="_blank"
                  >
                    <img
                      className="bandcamp-grey"
                      src="https://521dimensions.com/img/open-source/amplitudejs/blue-player/bandcamp-grey.svg"
                    />
                    <img
                      className="bandcamp-white"
                      src="https://521dimensions.com/img/open-source/amplitudejs/blue-player/bandcamp-white.svg"
                    />
                  </a>
                  <span className="song-duration">{eachMusic.duration}</span>
                </div>
              ))}
            </div>
          ) : (
            <div id="amplitude-right">
              <div
                className="song amplitude-song-container amplitude-play-pause"
                // data-amplitude-song-index={`${index}`}
                // key={index}
              >
                No songs found!
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
