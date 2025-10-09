import qrmodel from "../models/qrmodel";

export const  QrController = {
    redirect: async (req , res) => {
        const id = req.params.id ;
        console.log("this is the particular id" , id)
        qrmodel.findOne({
            $where : {
                id : id
            }
        })
        res.redirect("https://www.google.com")
    }
}