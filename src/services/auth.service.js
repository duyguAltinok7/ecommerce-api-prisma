const repository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const register = async (userData) => {
    const { email, password, full_name } = userData;

    const user = await repository.findUserByEmail(email);
    if (user) {
        throw new AppError("bu email zaten kayıtlı", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        email,
        password: hashedPassword,
        full_name,
        role: "user"
    };

    const createdUser = await repository.createUser(newUser);
    return createdUser;
};

const login = async (userData) => {
    const { email, password } = userData;

    const kullanici = await repository.findUserByEmail(email);
    if (!kullanici) {
        throw new AppError("bu kullanıcı bulunamadı", 401);
    }

    const passwordMatch = await bcrypt.compare(password, kullanici.password);
    if (!passwordMatch) {
        throw new AppError("şifre yanlış", 401);
    }

    const token = jwt.sign(
        { id: kullanici.id, email: kullanici.email, role: kullanici.role },
        process.env.JWT_SECRET,
        { expiresIn: "4h" }
    );

    return token;
};

module.exports = { register, login };