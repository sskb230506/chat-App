import cloudinary from "../lib/cloudinary.js";
import Message from "../models/messages.js";
import User from "../models/User.js";

export const getAllContacts=async  (req,res)=>{
    try{
        const loggedInUserId= req.user._id;
        const filteredUsers= await User.find({_id: {$ne :loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);

    }catch(error){
        console.log("Error in gtAllContacts",error);
        res.status(500).json({message:"Server Error"});
    }

}

export const getMessagesByUserId= async (req,res)=>{
    try{
        const myId= req.user._id;
        const { id: otherId } = req.params;
        const messages= await Message.find({
            $or:[
                {senderId:myId,reciverId:otherId},
                {senderId:otherId,reciverId:myId}
            ]

        });
        res.status(200).json(messages);


    }
    catch(error){
          console.log("Error in getMessagesbyUSerID",error);
        res.status(500).json({message:"Internal Server Error"});


    }
}

export const sendMessage = async (req, res) => {
  try {
    const { image, text } = req.body;
    const senderId = req.user._id;
    const reciverId = req.params; 
    if(!text && !image){
        res.status(400).json({message:"text or image is required"});
    }
    if(senderId.equals(reciverId)){
        return res.status(400).json({message:'Cannot send messages to YourSelf'});
    }
    const reciverExists= await User.exists({_id:reciverId});
    if(!reciverExists){
        return res.status(404).json({message:"Reciver not found"});
    }

    let imageUrl;
    if (image) {
      const response = await cloudinary.uploader.upload(image);
      imageUrl = response.secure_url;
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getChatPartners= async (req,res)=>{
   try{
    const loggedInUserId= req.user._id;
    const messages= await Message.find({
        $or:[
            {senderId:loggedInUserId},{reciverId:loggedInUserId}
        ]
    });
    const ChatPartnerIds= [...new Set(messages.map((msg)=>msg.senderId.toString() === loggedInUserId.toString() ? msg.reciverId.toString() : msg.senderId.toString()))];
    const chatPartners= await User.find({_id:{$in:ChatPartnerIds}}).select("-password");
    res.status(201).json(chatPartners);

   }catch(error){
        console.log("Error in getChatPartners",error);
        res.status(500).json({message:"Internal Server Error"});

   }
}
