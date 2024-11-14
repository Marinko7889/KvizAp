const User = require("../model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Questionmodel = require("../model/Question")
const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        console.log(err);
    }

    if (existingUser) {
        return res.status(404)
            .json({ message: "user already exist login instead" })
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    try {
        await user.save();
    } catch (err) {
        console.log(err)
    }

    return res.status(201).json({ message: user })
}


const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return new Error(err)
    }
    if (!existingUser) {
        return res.status(400).json({ message: "user not found. Signup" })
    } else {
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
        if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Invalid email or password" })
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1000s'
        })
        console.log("Generated token \n", token)

        if (req.cookies[`${existingUser._id}`]) {
            req.cookies[`${existingUser._id}`] = "";
        }
        res.cookie(String(existingUser._id), token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 1000),
            httpOnly: true,
            sameSite: "lax"
        })
        return res.status(200).json({ message: "SUcesfully logged in", user: existingUser, token })

    }
}

const verifiyToken = (req, res, next) => {

    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    console.log(token)

    if (!token) {
        res.status(404).json({ message: "No token found" })
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Invalid token" })
        }
        console.log(user.id);
        req.id = user.id;
    })
    next();
}

const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, "-password")
    } catch (err) {
        return new Error(err)
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({ user })
}

const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];

    if (!prevToken) {
        return res.status(400).json({ message: "Couldnt find token" })
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" })
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1000s"
        })
        console.log("Regenerated token \n", token)
        res.cookie(String(user.id), token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 1000),//30sekundi
            httpOnly: true,
            sameSite: "lax"
        });
        req.id = user.id;
        next();

    })

}

const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];

    if (!prevToken) {
        return res.status(400).json({ message: "Couldnt find token" })
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" })
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({ message: "Succesfully logged out" })


    })

}

const question = (req, res, next) => {
    const { id, question, options, answer } = req.body;

    const quest = new Questionmodel({
        id,
        question,
        options,
        answer
    });

    try {
        quest.save();
        console.log(quest)
    } catch (err) {
        console.log(err)
    }

    return res.status(201).json({ message: quest })
}



const GetQuestion = async (req, res, next) => {
    try {
        const questions = await Questionmodel.find();
        const objektPodaci = {
            questions: questions,
        };
        return res.status(200).json(objektPodaci);
    } catch (err) {
        return next(new Error(err));
    }
};


exports.logout = logout
exports.signup = signup
exports.login = login
exports.verifiyToken = verifiyToken
exports.getUser = getUser
exports.refreshToken = refreshToken
exports.question = question
exports.GetQuestion = GetQuestion