import React from 'react';

export default function Intro(props) {
    return (
        <div className="intro">
            <h1>Art Pop Quiz</h1>
            <h2>Test your knowledge on art!</h2>
            <button 
            className='btn start-btn'
            onClick={props.handleClick}>Start Quiz</button>
        </div>
    )
}
