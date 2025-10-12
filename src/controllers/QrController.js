import qrmodel from "../models/qrmodel";

export const  QrController = {
    redirect : async (req , res) => {
        const id = req.params.id ;
        console.log("this is the particular id" , id)
        const foundedQrCode = qrmodel.findOne({
            $where : {
                id 
            }
        })
        console.log("this is the data")
        res.redirect(foundedQrCode.destination)
    },
    addRedirectionData : async (req , res) => {
        const {id , destination} = req.body ;
        const QrModel = new qrmodel({
            id  , 
            destination 
        })
        return res.status(200).json({
            success : true ,
            data : "the data has been added in the db"
        })
    }
}