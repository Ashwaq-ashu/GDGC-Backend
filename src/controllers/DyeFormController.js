import Form from "../models/Form.js";

export const DyeFormController = {
    // Create new form application
    Create: async (req, res) => {
        try {
            const newApp = new Form(req.body);
            await newApp.save();

            res.status(201).json({
                success: true,
                message: "Application created successfully",
                data: newApp
            });
        } catch (error) {
            console.error("Error saving application:", error);
            res.status(400).json({
                success: false,
                message: "Error creating application",
                error: error.message
            });
        }
    },

    // Get all applications
    GetAll: async (req, res) => {
        try {
            const applications = await Form.find();

            res.status(200).json({
                success: true,
                message: "Applications fetched successfully",
                data: applications
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error fetching applications",
                error: error.message
            });
        }
    }
};

