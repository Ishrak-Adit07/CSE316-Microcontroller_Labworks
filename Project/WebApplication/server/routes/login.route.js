import express from 'express'
import { greenPlayer1, redPlayer1 } from '../models/player.model.js';
const router = express.Router();

router.get("/red", async(req, res)=>{
    res.status(200).send(redPlayer1);
});


router.get("/green", async(req, res)=>{
    res.status(200).send(greenPlayer1);
});

router.post("/name", async(req, res)=>{

    console.log(req.body.team);
    const {team, number, name} = req.body;

    redPlayer1.score = 0;
    greenPlayer1.score = 0;

    if(team == "red"){
        if(number == "1"){
            redPlayer1.playerName = name;
        }
        res.status(200).send(redPlayer1);
    }
    else if(team == "green"){
        if(number == "1"){
            greenPlayer1.playerName = name;
        }
        res.status(200).send(greenPlayer1);
    }
    else{
        res.status(404).send("Server received false data");
    }

});

router.post("/names", async(req, res)=>{

    const {redName1, greenName1} = req.body;

    redPlayer1.score = 0;
    greenPlayer1.score = 0;

    redPlayer1.playerName = redName1;
    greenPlayer1.playerName = greenName1;

    console.log(redName1, greenName1);

    res.status(200).send({success:true, redPlayer1, greenPlayer1});
});

router.post("/id", async(req, res)=>{

    const {team, number, id, password} = req.body;
    console.log(team, number, id, password);

    if(team == "red"){
        if(number == "1"){
            redPlayer1.playerID = id;
            redPlayer1.password = password;
            redPlayer1.score = 0;
        }
        res.status(200).send(redPlayer1);
    }
    else if(team == "green"){
        if(number == "1"){
            greenPlayer1.playerID = id;
            greenPlayer1.password = password;
            greenPlayer1.score = 0;
        }
        res.status(200).send(greenPlayer1);
    }
    else{
        res.status(404).send("Server received false data");
    }
});

router.post("/score", async(req, res)=>{
    
    const {playerID, opponent1HitCount, friend1HitCount} = req.body;
    console.log(playerID, opponent1HitCount, friend1HitCount);

    if(redPlayer1.playerID === playerID){
        redPlayer1.green1Hit = opponent1HitCount;
        redPlayer1.red2Hit = friend1HitCount;

        greenPlayer1.score += opponent1HitCount*50;
        redPlayer1.score -= opponent1HitCount*30;
        redPlayer1.score -= friend1HitCount*20;

        res.status(200).send(redPlayer1);
    }

    else if(greenPlayer1.playerID === playerID){
        greenPlayer1.red1Hit = opponent1HitCount;
        greenPlayer1.green2Hit = friend1HitCount;

        redPlayer1.score += opponent1HitCount*50;
        greenPlayer1.score -= opponent1HitCount*30;
        greenPlayer1.score -= friend1HitCount*20;

        res.status(200).send(greenPlayer1);
    }

    else{
        res.status(404).send("Not working");
    }

});

router.get("/liveScore", async(req, res)=>{

    console.log(redPlayer1.playerName, redPlayer1.playerID, redPlayer1.score);
    console.log(greenPlayer1.playerName, greenPlayer1.playerID, greenPlayer1.score);

    const liveScoreObject = {
        "Score" : "score",
        "red1Score" : redPlayer1.score,
        "green1Score" : greenPlayer1.score
    }

    res.status(200).send(liveScoreObject);

});

router.get("/finalScore", async(req, res)=>{

    console.log(redPlayer1.playerName + " score : " + redPlayer1.score);
    console.log(greenPlayer1.playerName + " score : " + greenPlayer1.score);

    let finalScoreObject = {
        "red1FinalScore" : redPlayer1.score,
        "green1FinalScore" : greenPlayer1.score 
    }

    redPlayer1.playerName = "";
    redPlayer1.playerID = "";
    redPlayer1.password = "";
    redPlayer1.score = 0;

    greenPlayer1.playerName = "";
    greenPlayer1.playerID = "";
    greenPlayer1.password = "";
    greenPlayer1.score = 0;

    res.status(200).send(finalScoreObject);

}); 

router.get("/:id/:password", async(req, res)=>{

    const {id, password} = req.params;
    res.status(200).send("Login verified");
});

export default router;