import { unlink } from "fs";
import User from "../model/user"
import { Response, Request } from "express";

// get landig page
export const getLandingPage = async (req: Request, res: Response) => {
    res.redirect('/users')
}

// users page
export const getUsersData = async (req: Request, res: Response) => {

    let searchData = req.query.search as string

    if (searchData) {

        const searchRegex = new RegExp(searchData, 'i');

        let users = await User.find({
            $or: [
                { name: searchRegex },
                { email: searchRegex },
                { phoneNo: searchRegex }
            ]
        });

        return res.render('dashboard', { users , search:searchData})

    } else {
        const users = await User.find({})
        return res.render('dashboard', { users })
    }

};

// add user
export const addUser = async (req: Request, res: Response) => {

    const { name, email, phoneNo } = req.body
    const files = req.files as Express.Multer.File[];
    const image = files[0].filename

    const isUser = await User.findOne({ email })
    if (isUser) {

        unlink(`src/public/uploads/${image}}`, (err) => {
            if (err) {
                console.log(err)
            }
            console.log('image deleted')
        })

        return res.status(400).json({
            msg: 'Email already exists'
        })
    }

    const user = new User({
        name,
        phoneNo,
        email,
        image
    })

    const newUser = await user.save()

    res.status(200).json({
        msg: 'Successfully added a user',
        user: newUser
    })

}

// edit user

export const editUser = async (req: Request, res: Response) => {

    const { userId, name, email, phoneNo } = req.body
    const files = req.files as Express.Multer.File[]

    let image;
    if (files.length > 0) {
        image = files[0].filename
    }

    const isUser = await User.findOne({ _id: { $ne: userId }, email: email })
    if (isUser) {

        if (image) {
            unlink(`src/public/uploads/${image}}`, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log('image deleted')
            })
        }

        return res.status(200).json({
            msg: 'Email already exists'
        })
    }
    

    let user = await User.findOne({ _id: userId })

    if (image) {
        unlink(`src/public/uploads/${user?.image}`, (err) => {
            if (err) {
                console.log(err)
            }
            console.log('image deleted')
        })
    }

    if (user) {
        user.name = name;
        user.email = email;
        user.phoneNo = phoneNo
        if (image) {
            user.image = image
        }
        await user?.save()

        return res.status(200).json({
            msg: "Successfully Updated"
        })
    }

    res.status(400).json({
        msg: 'No user found!'
    })

}


// delete user
export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.query.userId
    const user = await User.findOne({ _id: userId })

    if (user) {
       
        unlink(`src/public/uploads/${user.image}`, (err) => {
            if (err) {
                console.log(err)
            }
            console.log('image deleted')
        })

        await User.deleteOne({ _id: userId })


        return res.status(200).json({
            msg: 'Successfuly Deleted'
        })
    }

    res.status(400).json({
        msg: 'No user found!'
    })
}


