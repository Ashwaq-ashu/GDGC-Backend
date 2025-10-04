const EventsController = {
    getEvents: async (req , res) => {
        getEvents()
    } ,
    addApplicatinForEvent: async (req , res) => {
        try {
            const {
                name,
                rollNo,
                phoneNo,
                branch,
                year,
                resume,
                linkedin,
                email ,
                github,
                previousWork,
                selectedPortfolios,
                portfolio1,
                portfolio2,
                status
            } = req.body;
            const response = addApplicationDB(name,
                rollNo,
                phoneNo,
                branch,
                year,
                resume,
                linkedin,
                email ,
                github,
                previousWork,
                selectedPortfolios,
                portfolio1,
                portfolio2,
                status)
                return res.status(201).json({ success: true, message : "the data has been added succefully" })
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message })
        }
    }, 
    getApplicatinForEvent: async (req , res) => {
        try {
            const response = getApplicationFromDB()
            return res.status(201).json({ success: true, data : response })
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message })
        }
    }
}

// the core logic is suppose to be written here u can invoke multiple db calles from the models so that we can 
// resue some db calls and make our code clean and reusable