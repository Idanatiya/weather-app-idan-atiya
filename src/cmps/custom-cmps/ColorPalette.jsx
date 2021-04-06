import React, {useState, useEffect} from 'react';
import {setTheme} from '../../store/actions/prefAction';
import {useDispatch} from 'react-redux';
const COLOR_PALETTE = require ('nice-color-palettes/100').flat (100);
const PAGE_SIZE = 25;

export default function ColorPalette () {
  const [colorsToShow, setColorsToShow] = useState ([]);
  const [selectedColor, setSelectedColor] = useState (null);
  const [pageNum, setPageNum] = useState (0);
  const dispatch = useDispatch ();

  const handleSelectColor = color => {
    setSelectedColor (color);
    dispatch (setTheme (color));
  };

  useEffect (
    () => {
      const fromIdx = pageNum * PAGE_SIZE;
      const endIdx = fromIdx + PAGE_SIZE;
      const newColors = COLOR_PALETTE.slice (fromIdx, endIdx);
      setColorsToShow (newColors);
    },
    [pageNum]
  );

  const handleShowMore = () => {
    if (pageNum * PAGE_SIZE >= COLOR_PALETTE.length - PAGE_SIZE) {
      setPageNum (0);
    } else {
      setPageNum (pageNum + 1);
    }
  };

  return (
    <section className="palette-container">
      {COLOR_PALETTE &&
        colorsToShow.map ((color, idx) => (
          <div
            key={idx}
            className={`color-circle ${color === selectedColor ? 'selected' : ''}`}
            style={{backgroundColor: color}}
            onClick={() => handleSelectColor (color)}
          />
        ))}
      <div
        onClick={() => handleSelectColor ('#2f3136')}
        style={{backgroundColor: '#2f3136'}}
        className={`color-circle ${selectedColor === '#2f3136' ? 'selected' : ''}`}
      />
      <span className="color-circle next-circle" onClick={handleShowMore}>
        <i className="far fa-arrow-alt-circle-right" />
      </span>
    </section>
  );
}
