import Score from "../model/Score.js"

export const getUserPoints=async (req,res)=>{
    const score =await Score.findOne({userId:req.params.userId});
    res.json(score || {totalPoints:0,history:[]})
}