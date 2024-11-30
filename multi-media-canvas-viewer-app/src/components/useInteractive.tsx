// useInteractive.tsx

import { useRef, useState, useEffect } from 'react';
import { Transformer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

const useInteractive = () => {
  const itemRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected && itemRef.current) {
      trRef.current.nodes([itemRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const onSelect = () => {
    setIsSelected(true);
  };

  const onDeselect = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      setIsSelected(false);
    }
  };

  const onWheel = (e: KonvaEventObject<WheelEvent>) => {
    if (!isSelected) return;

    e.evt.preventDefault();
    e.cancelBubble = true;

    const scaleBy = 1.02;
    const oldScale = itemRef.current.scaleX();
    const pointer = itemRef.current.getStage().getPointerPosition();
    const mousePointTo = {
      x: (pointer.x - itemRef.current.x()) / oldScale,
      y: (pointer.y - itemRef.current.y()) / oldScale,
    };
    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    itemRef.current.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    itemRef.current.position(newPos);
    itemRef.current.getLayer().batchDraw();
  };

  return {
    itemRef,
    trRef,
    isSelected,
    onSelect,
    onDeselect,
    onWheel,
  };
};

export default useInteractive;
