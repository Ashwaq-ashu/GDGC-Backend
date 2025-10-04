import { Prisma } from "@prisma/client";

export async function getEvents () {
    await Prisma.event.findMany()
}
export async function getSomethingElse  () {
    await Prisma.event.findMany()
}
export async function getFood () {
    await Prisma.event.findMany()
}
export async function getDetails () {
    await Prisma.event.findMany()
}
export async function addApplicationDB (name,
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
    status) {
        try {
            const created = await Prisma.application.create({
                data: {
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
                    ...(status ? { status } : {})
                }
            });
            return created
        } catch (error) {
            throw new Error(error.message)
        }
        
}
export async function getApplicationFromDB () {
        try {
            const created = await Prisma.application.findMany();
            return created
        } catch (error) {
            throw new Error(error.message)
        }
        
}




// all the DB calls should be done from this folder and no db call should be written in the controller 