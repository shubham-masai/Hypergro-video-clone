import React from 'react';

const Loading: React.FC = () => {
    return (
        <div>
            <div className='relative overflow-hidden rounded-lg hover:rounded-none h-[237px] gradient-background'>
                <div className="w-full h-full object-cover rounded-lg"></div>
            </div>
            <div className="mt-2 flex items-start gap-2 ">
                <div className="w-[2.2rem] h-[2.2rem] rounded-full gradient-background"></div>
                <div className='w-[90%] flex flex-col gap-2'>
                    <h3 className=" w-full h-[0.8rem] gradient-background rounded-lg"></h3>
                    <p className="w-full h-[0.8rem] gradient-background rounded-lg"></p>
                    <p className="w-full h-[0.8rem] gradient-background rounded-lg"></p>
                </div>
            </div>
        </div>
    );
};

export default Loading;
