import React, { useState, useEffect, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { musicData } from "data/playlist";

const objToArr = (obj) => {
  const arrData = Object.keys(obj).reduce(
    (acc, eachKey) =>
      obj[eachKey]
        .map((v) => ({
          ...v,
          category: eachKey,
          searchTerm: `${v.name} - ${v.artist}`,
        }))
        .concat(acc),
    []
  );
  return arrData;
};

const Search = ({ handleSearchCallback }) => {
  const [musicList, setMusicList] = useState(objToArr(musicData));
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef();

  useEffect(() => {
    if (suggestions && suggestions?.length > 0) {
      handleSearchCallback(suggestions);
      searchRef.current.blur();
    }
  }, [suggestions]);

  return (
    <form className="form-inline my-4">
      {/* <div className="form-group mx-sm-3 mb-2"> */}
      <Typeahead
        id="music-search"
        labelKey="name"
        filterBy={["name", "artist"]}
        onChange={setSuggestions}
        clearButton
        // defaultSelected={musicList.slice(0, 1)}
        options={musicList}
        placeholder="Search music or artist"
        selected={suggestions}
        minLength={3}
        ref={searchRef}
        renderMenuItemChildren={(option) => (
          <div>
            {option.name}
            <div>
              <small>Artist: {option.artist}</small>
            </div>
          </div>
        )}
        // renderMenu={(results, menuProps, state) => {
        //   let index = 0;
        //   const categories = groupBy(results, "category");
        //   const items = Object.keys(categories).map((category) => (
        //     <React.Fragment key={category}>
        //       {index !== 0 && <Menu.Divider />}
        //       <Menu.Header>{category.toUpperCase()}</Menu.Header>
        //       {categories[category].map((i) => {
        //         const item = (
        //           <MenuItem key={index} option={i} position={index}>
        //             <Highlighter search={state.name}>
        //               `{i.name} - {i.artist}
        //             </Highlighter>
        //           </MenuItem>
        //         );

        //         index += 1;
        //         return item;
        //       })}
        //     </React.Fragment>
        //   ));
        //   return <Menu {...menuProps}>{items}</Menu>;
        // }}
      />
      {/* </div> */}
    </form>
  );
};

export default Search;
