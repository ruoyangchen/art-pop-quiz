import React, { useEffect } from 'react';
import he from 'he';

export default function Questions(props) {
    const data = props.data
    const [selectedAnswers, setSelectedAnswers] = React.useState({});
    const [isFinished, setIsFinished] = React.useState(false)
    const [correctCount, setCorrectCount] = React.useState(0)


    function checkAnswers() {
        
        if(Object.keys(selectedAnswers).length === data.length){
            setIsFinished(true)
             // Count correct answers
             let count = 0
             data.forEach((questionParent, index) => {
                 if (selectedAnswers[index] === questionParent.correct_answer) {
                     count++
                 }
             })
             setCorrectCount(count) // Set the count of correct answers


        }else {
            alert('Please answer all questions before checking');
        }
    }
   

    function handleAnswerSelect(index, answer) {
        setSelectedAnswers({ ...selectedAnswers, [index]: answer })
    }

    const questionsDisplay = data.map((questionParent, index) => {
     
        // for every question, return question and answers
        // check if the user selects the correct answer, add a answerClass to conditional render w/ css
        return (
            <div className="question-container" key={index}>
                <h3>{he.decode(questionParent.question)}</h3> 
                <div className="answers">
                    {questionParent.allAnswers.map((answer, i) => {
                        let answerClass = ""
                        const isSelectedAnswer = selectedAnswers[index] === answer
                        if (isFinished){
                            if(answer === questionParent.correct_answer && isSelectedAnswer){
                                answerClass = "correct"
                            }else if(answer !== questionParent.correct_answer && isSelectedAnswer){
                                answerClass = "incorrect"
                            }else if(answer !==questionParent.correct_answer && !isSelectedAnswer){
                                answerClass = "unselected-incorrect"
                            }else if(answer === questionParent.correct_answer && !isSelectedAnswer){
                                answerClass = "unselected-correct"
                            }
                        }

                        return (
                        <div key={`${index}-${i}`} className={`answer-option ${isSelectedAnswer ? 'selected' : ''} ${isFinished && answerClass}`}>
                            <input
                                type="radio"
                                id={`question_${index}_answer_${i}`}
                                name={`question_${index}_answers`}
                                value={answer}
                                checked={isSelectedAnswer}
                                onChange={() => handleAnswerSelect(index, answer)}
                            />
                            <label
                                htmlFor={`question_${index}_answer_${i}`}
                                className={`answer-label`}
                            >
                                {he.decode(answer)}
                            </label>
                        </div>
                        )
                    }
                    
                    
                    )}
                </div>
            </div>
        );
    });

    

    return (
        <div className="quiz-page">
            {questionsDisplay}
            {isFinished && <p className="result-message">You scored {correctCount}/{data.length} correct answer{correctCount > 1 ? "s":"" }!</p>}
            <button className="check-btn" onClick={checkAnswers}>Check Answers</button>
        </div>
    )
}
