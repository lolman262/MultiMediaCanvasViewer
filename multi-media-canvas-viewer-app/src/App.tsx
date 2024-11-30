import React, { useState, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import { useDropzone } from 'react-dropzone';
import useImage from 'use-image';
import ImageItem from './components/imageItem';
import VideoItem from './components/videoItem';
import { parseGIF, decompressFrames } from 'gifuct-js';
import { FaPlus } from 'react-icons/fa';
import Sidebar from './components/sidebar';

const App: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [stageScale, setStageScale] = useState(1);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
  const stageRef = useRef<any>(null);

  const onWheel = (e: any) => {
    if (e.cancelBubble) return; 
    
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x:
        stage.getPointerPosition().x / oldScale -
        stage.x() / oldScale,
      y:
        stage.getPointerPosition().y / oldScale -
        stage.y() / oldScale,
    };
    const newScale =
      e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setStageScale(newScale);
    const newPos = {
      x:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
        newScale,
      y:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
        newScale,
    };
    setStagePosition(newPos);
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      // if (file.type === 'image/gif') {
      //   const reader = new FileReader();
      //   reader.onload = () => {
      //     const buffer = reader.result as ArrayBuffer;
      //     const gif = parseGIF(buffer);
      //     const frames = decompressFrames(gif, true);
      //     // Store frames for scrubbing
      //   };
      //   reader.readAsArrayBuffer(file);
      // }
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('image/')
        ? 'image'
        : file.type.startsWith('video/')
        ? 'video'
        : null;
      setMediaItems((items) => [...items, { url, type, file }]);
    });
  };

  const { getRootProps } = useDropzone({ onDrop });

  const onDoubleClick = () => {
    setStageScale(1);
    setStagePosition({ x: 0, y: 0 });
  };

  return (
    <div {...getRootProps()}>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stagePosition.x}
        y={stagePosition.y}
        draggable
        onWheel={onWheel}
        onDblClick={onDoubleClick}
        ref={stageRef}
      >
        <Layer>
          {mediaItems.map((item, i) => {
            if (item.type === 'image') {
              return (
                <ImageItem
                  key={i}
                  imageUrl={item.url}
                // Pass other necessary props
                />
              );
            } else if (item.type === 'video') {
              return (
                <VideoItem
                  key={i}
                  videoUrl={item.url}
                // Pass other necessary props
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
      <FaPlus
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          cursor: 'pointer',
        }}
        onClick={() => {
          // Trigger file input click
        }}
      />
      {/* Include Sidebar component */}
      <Sidebar mediaItems={mediaItems} />
    </div>
  );
};

export default App;