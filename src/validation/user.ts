import { Response, Request , NextFunction} from "express"

export const validate = async (req: Request, res: Response, next : NextFunction) => {
    const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const phoneNoPattern = /^[1-9][0-9]{9}$/;

    const { name, email, phoneNo } = req.body

     // Email validation
     if (!emailPattern.test(email.toLowerCase().trim())) {
        return res.status(401).json({ msg: 'Invalid email format'});
    }

    // PhoneNo validation
    if (!namePattern.test(name.trim())) {
        return res.status(401).json({ msg: 'Invalid Name, enter only alphabets'});
    }

    // Password Validation if password is not undefined
    if (!phoneNoPattern.test(phoneNo.trim())) {
        return res.status(401).json({ msg: 'Invalid phone number, only 10 digits'});
    }

    next()
}
