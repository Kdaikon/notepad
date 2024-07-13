import React from 'react';
import { tooliconname } from '../logic/CanvasDefs';
import { 
    FolderPlusIcon, 
    PencilIcon, 
    CursorArrowRaysIcon, 
    ArrowDownTrayIcon,
    TrashIcon,
    XCircleIcon,
    ArrowUturnLeftIcon,
    MinusCircleIcon,
 } from '@heroicons/react/24/outline';

type IconButtonProps = {
    iconName: tooliconname;
    onClick: (e:any) => void;
    onUse: boolean;
};

const ToolIcon: React.FC<IconButtonProps> = ({ iconName, onClick ,onUse }) => {
    let iconelemet;
    switch (iconName){
        case 'pen':
            iconelemet = <PencilIcon className="h-12 w-12"/>;
            break;
        case 'eraser':
            iconelemet = <TrashIcon className="h-12 w-12" />;
            break;
        case 'plus':
            iconelemet = <FolderPlusIcon className="h-12 w-12" />;
            break;
        case 'arrow':
            iconelemet = <CursorArrowRaysIcon className="h-12 w-12" />;
            break;
        case 'peneraser':
            iconelemet = <MinusCircleIcon className='h-12 w-12'/>;
            break;
        case 'download':
            iconelemet = <ArrowDownTrayIcon className="h-12 w-12" />;
            break;
        case 'redo':
            iconelemet = <ArrowUturnLeftIcon className="h-12 w-12" />;
            break;
        default:
            iconelemet = <XCircleIcon className="h-12 w-12" />;
            break;
    }
        
    return (
        <button 
            className={`
                hover:bg-gray-300 h-12 w-12 
                ${onUse ? 'bg-gray-500' : 'bg-gray-100'}    
            `}  
            onClick={onClick} 
        >
            {iconelemet}
        </button>
    );
};

export default ToolIcon;
