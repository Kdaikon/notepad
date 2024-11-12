import React from 'react';
import { tooliconname } from '../logic/CanvasDefs';
import { useState } from 'react';
import {
    FolderPlusIcon,
    PencilIcon,
    CursorArrowRaysIcon,
    ArrowDownTrayIcon,
    TrashIcon,
    XCircleIcon,
    ArrowUturnLeftIcon,
    MinusCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

type IconButtonProps = {
    iconName: tooliconname;
    onClick: (e: any) => void;
    onUse: boolean;
};

const ToolIcon: React.FC<IconButtonProps> = ({ iconName, onClick, onUse }) => {
    let iconelemet;
    let details = "alter text";
    const [isHovered, setIsHovered] = useState(false);

    switch (iconName) {
        case 'pen':
            iconelemet = <PencilIcon className="h-12 w-12" />;
            details = "brack pen";
            break;
        case 'eraser':
            iconelemet = <TrashIcon className="h-12 w-12" />;
            details = "delete text";
            break;
        case 'plus':
            iconelemet = <FolderPlusIcon className="h-12 w-12" />;
            details = "new text";
            break;
        case 'arrow':
            iconelemet = <CursorArrowRaysIcon className="h-12 w-12" />;
            details = "select text";
            break;
        case 'peneraser':
            iconelemet = <MinusCircleIcon className='h-12 w-12' />;
            details = "eraser";
            break;
        case 'download':
            iconelemet = <ArrowDownTrayIcon className="h-12 w-12" />;
            details = "output PDF";
            break;
        case 'redo':
            iconelemet = <ArrowUturnLeftIcon className="h-12 w-12" />;
            details = "delete text";
            break;
        case 'vanish':
            iconelemet = <XMarkIcon className="h-12 w-12" />;
            details = "delete all";

        default:
            iconelemet = <XCircleIcon className="h-12 w-12" />;
            break;
    }

    return (
        <div className="relative inline-block">
            {isHovered && (
                <div className='absolute w-20 -bottom-4 -left-4 text-sm flex items-center justify-center z-50'>
                    <div className='w-fit bg-gray-600 text-slate-50 px-1 text-sm rounded'>
                        {details}
                    </div>
                </div>
            )}

            <button
                title={'tool' + iconName}
                className={`
                hover:bg-gray-300 h-12 w-12
                ${onUse ? 'bg-gray-500' : 'bg-gray-100'}    
            `}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {iconelemet}
            </button>

        </div>

    );
};

export default ToolIcon;
