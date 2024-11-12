import React from 'react';

type ShelfProps = {
    barName: string;
    height: number;
};

const Shelf: React.FC<ShelfProps> = ({barName,height}) => {
    return(
        
        <div className={`h-${height} w-1 bg-gray-800`} ></div>
        
    );
};
export default Shelf;