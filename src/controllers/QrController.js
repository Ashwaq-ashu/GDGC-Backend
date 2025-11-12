import Qr from "../models/qrmodel.js";

export const QrController = {
    redirect : async (req , res) => {
        try {
            const id = req.params.id ;
            console.log("this is the particular id" , id)
            const foundedQrCode = Qr.findOne({
                $where : {
                    id 
                }
            })
            console.log("this is the data")
            res.redirect(foundedQrCode.destination)
        } catch (error) {
            res.redirect("https://gdgcmjcet.in")
            console.log(error, "An error occured while redirecting")
        }
    },
    updateRedirectionData : async (req , res) => {
        try {
           const {id , destination} = req.body ;
           // make sure the destination link it starts with https or http 
            Qr.updateOne({
                $where : {
                    id : id , 
                    destination : destination
                }
            })
            // await QrModel.save();
            return res.status(200).json({
                success : true ,
                message : "the data has been updated in the db"
            }) 
        } catch (error) {
            return res.status(500).json({
                success : false ,
                message : "An error has occured while updating data" ,
                error ,
            }) 
        }
        
    },
    getDataOfQr : async (req , res) => {
        try {
            const data = await Qr.findOne({
                $where : {
                    id : req.body.id
                }
            })
            return res.status(200).json({
                success : true ,
                message : "data has been fetched succesfully" ,
                data
            })
        } catch (error) {
            return res.status(500).json({
                success : false ,
                message : "An error has occured while fetching qr data" ,
                error ,
            }) 
        }
    }
}