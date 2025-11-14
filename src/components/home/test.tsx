import React from 'react'

const Test = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className="size-20 perspective-dramatic ...">
                <div className="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>
                <div className="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>
                <div className="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>
                <div className="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>
                <div className="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>
                <div className="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div>
            </div>
            <div className="size-20 perspective-normal ...">
                <div className="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>
                <div className="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>
                <div className="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>
                <div className="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>
                <div className="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>
                <div className="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div>
            </div>

        </div>
    )
}

export default Test
