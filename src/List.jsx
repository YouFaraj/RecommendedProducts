import React from 'react';
import ListItem from './ListItem.jsx';
import {RecList, NavButtonRight, NavButtonLeft} from './Styles.jsx';

const List = ({listItems, handleClick, selectedDot, numVisible, numDots}) => {
  // added a key generator to get rid of bugs
  let key = 0;
  function keyGenerator(){
    key++
    return key;
  }
  const minIVisible = selectedDot * numVisible;
  const maxIVisible = minIVisible + numVisible - 1;

  const onLeftmostPage = selectedDot === 0;
  const onRightmostPage = selectedDot === numDots - 1;

  return (
  <RecList>
    {onLeftmostPage ? '' : <NavButtonLeft key={'navButtonLeft'} onClick={() => handleClick(-1)}>&#5176;</NavButtonLeft>}

      {listItems.map((item, i) =>
        <ListItem item={item} key={keyGenerator()} visible={i >= minIVisible && i <= maxIVisible}/> )}

    {onRightmostPage ? '' : <NavButtonRight key={'navButtonRight'} onClick={() => handleClick(1)}>&#5171;</NavButtonRight>}
  </RecList>
  );
};

export default List;
