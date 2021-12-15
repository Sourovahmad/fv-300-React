import React from "react";
import glassIcon from '../../ImgAndIcons/magnifying-glass.png';

const SearchSection = () => {
  return (
    <div>
      <div class="top-part">
        <div class="search-box">
          <div class="icon">
            <img src={glassIcon} alt="" />
          </div>
          <div class="input">
            <input type="text" placeholder="Search Notes" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
