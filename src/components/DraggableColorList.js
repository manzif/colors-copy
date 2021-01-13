import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import DraggableColorBox from '../components/DraggableColorBox';

const DraggableColorList = SortableContainer(({ colors, deleteColor }) => {
  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, index) => (
        <DraggableColorBox
          index={index}
          key={color.name}
          color={color.color}
          name={color.name}
          deleteColor={() => deleteColor(color.name)}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
