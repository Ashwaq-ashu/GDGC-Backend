import { Tweet } from  "../models/tweet.js";


export async function CreateTweet(req,res) {
    try{
        const {text,media} = req.body;
        if(!text){
            return res.status(400).json({
                message:"the Tweet can't be empty, Share Something Interesting!!"
            });
        }
        const tweet = await Tweet.create({
            text,
            media,
            author: req.user.id,
        });
        return res.status(200).json({
            message:"your tweet has successfully created!!",tweet
        });
    }
    catch(error){
        return res.status(500).json({
            message: "error from server side",
            error: error.message,
        });
    }    
};

export async function getRecentTweet(req,res) {
    try{
        const tweet = await Tweet.find().toSorted({createdAt:-1}).limit(10);
        return res.status(200).json({
            message:"the post's are Fetched successfully",tweet
        });
    }
    catch(err){
        return res.status(500).json({
            message: "Error while fetching the post's",
            error:err.message,
        });
    };
    
};



export async function getUserTweets(req, res) {
    try{
        const{userID}= req.params;
        const fetchUserPost = await Tweet.find({author: userID,}).sort({createdAt: -1}).limit(5);
        return res.status(200).json({message:"all the user's recent post are generated successfully!",fetchUserPost});
            
        
    }
    catch(err){
        return res.status(500).json({
            message:"error form server side sorry",
            error: error.message,
            
        });
    }

};
