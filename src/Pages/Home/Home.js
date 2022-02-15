import { Button, MenuItem, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import "./Home.css";
import Categories from '../../Data/Categories'
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Home = ({name, setName, fetchQuestion}) => {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);


    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!category || !difficulty || !name) {
            setError(true);
            return;
        } else {
            setError(false);
            fetchQuestion(category, difficulty);
            navigate("/quiz");
        }
    };

    return(
    <div className='content'>
        <div className='settings'>
            <span style={{ fontSize: 30 }}>Quiz Settings</span>

            <div className='settings__select'>
                {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}

                <TextField
                style={{ marginBottom: 25 }}
                label="Enter Your Name"
                variant='outlined'
                onChange={(e) => setName(e.target.value)}
                value={name}
                />

                <TextField
                select
                label="Select Category"
                variant='outlined'
                style={{ marginBottom: 30 }}
                onChange={(e) => setCategory(e.target.value)}
                >
                    {Categories.map((cat) => (
                        <MenuItem key={cat.category} value={cat.value}>
                            {cat.category}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                select
                label="Select Difficulty"
                variant='outlined'
                style={{ marginBottom: 30 }}
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}
                >
                    <MenuItem key="Easy" value="easy">
                    Easy
                    </MenuItem>
                    <MenuItem key="Medium" value="medium">
                    Medium
                    </MenuItem>
                    <MenuItem key="Hard" value="hard">
                    Hard
                    </MenuItem>
                </TextField>

                <Button 
                variant='contained' 
                color="primary" 
                size="large"
                onClick={handleSubmit}
                >
                    Start Quiz
                </Button>
            </div>
        </div>

        <img src="/quiz.svg" className='banner' alt='quiz-img'/>


    </div>
    );
};

export default Home;