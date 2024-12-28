import React from 'react';
import Image from 'next/image';

type ProfilefProps = {
    Name: string;
    Desc: string;
    img: string;
};

const Profile: React.FC<ProfilefProps> = ({ Name,Desc,img }) => {
    return (

        <div className='pr-3 w-100'>
            <div className='text-lg font-bold'>
             <Image 
                src={img} 
                alt='tun' 
                width={200} 
                height={400}
                className='hover:rotate-3 transition-transform duration-300'/>
            {Name}<br/>
            {Desc}   
            </div>
            
        </div>

    );
};

export default Profile;