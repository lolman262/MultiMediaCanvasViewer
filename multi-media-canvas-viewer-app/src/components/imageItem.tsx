// ImageItem.tsx

import React from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import useInteractive from './useInteractive';

const ImageItem: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const [image] = useImage(imageUrl);
  const {
    itemRef,
    trRef,
    isSelected,
    onSelect,
    onDeselect,
    onWheel,
  } = useInteractive();

  return (
    <>
      <Image
        image={image}
        ref={itemRef}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onWheel={onWheel}
        // Add other event handlers as needed
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => newBox}
        />
      )}
    </>
  );
};

export default ImageItem;
