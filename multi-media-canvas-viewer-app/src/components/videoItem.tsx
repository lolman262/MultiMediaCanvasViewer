// VideoItem.tsx

import React, { useRef, useEffect, useState } from 'react';
import { Image , Transformer} from 'react-konva';
import Konva from 'konva';
import useInteractive from './useInteractive';

interface VideoItemProps {
  videoUrl: string;
  // Add other props as needed
}

const VideoItem: React.FC<VideoItemProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageRef = useRef<Konva.Image>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const {
    itemRef,
    trRef,
    isSelected,
    onSelect,
    onDeselect,
    onWheel,
  } = useInteractive();

  useEffect(() => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.muted = true; // Muted by default
    video.loop = true;  // Looped by default
    video.playsInline = true;
    video.crossOrigin = 'anonymous';

    videoRef.current = video;

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);

      if (imageRef.current) {
        imageRef.current.width(video.videoWidth);
        imageRef.current.height(video.videoHeight);
        const layer = imageRef.current.getLayer();
        if (layer) {
          layer.batchDraw();
        }

        const anim = new Konva.Animation(() => {
          // Optionally update something on each frame
        }, layer);
        anim.start();

        // Clean up when component unmounts
        return () => {
          anim.stop();
        };
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.play();

    // Clean up event listener and video when component unmounts
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.pause();
      URL.revokeObjectURL(videoUrl); // Release the Blob URL
    };
  }, [videoUrl]);

  if (!isVideoReady || !videoRef.current) {
    // Optionally render a placeholder or loader
    return null;
  }

  return (
    <>
    <Image
      image={videoRef.current}
      ref={itemRef}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onWheel={onWheel}
      // Add event handlers similar to ImageItem
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

export default VideoItem;
