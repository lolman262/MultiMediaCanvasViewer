import React from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';

const App: React.FC = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect x={20} y={20} width={50} height={50} fill="red" />
        <Circle x={100} y={100} radius={50} fill="green" />
      </Layer>
    </Stage>
  );
};

export default App;