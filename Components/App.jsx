import React, { useState, useEffect } from 'react';
import Intro from "./Intro";
import Questions from "./Questions";

export default function App() {
    const [isStarted, setIsStarted] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const url = "https://opentdb.com/api.php?amount=5&category=25"

    // Function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    async function fetchData() {
        try {
            const response = await fetch(url)
            const data = await response.json()

            const fetchedData = data.results.map(questionParent => {
                return {
                    ...questionParent,
                    allAnswers: shuffleArray([...questionParent.incorrect_answers, questionParent.correct_answer])
                } 
            })
            return fetchedData
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    async function startGame() {
        console.log("start game!")
        setIsStarted(true);
        const data = await fetchData()
        setQuizData(data)
    }

    useEffect(() => {
        if (isStarted) {
            startGame();
        }
    }, []); // Run once when isStarted becomes true

    return (
        <div>
            {!isStarted && <Intro handleClick={startGame} />}
            {isStarted && quizData && <Questions data={quizData} />}
        </div>
    );
}
