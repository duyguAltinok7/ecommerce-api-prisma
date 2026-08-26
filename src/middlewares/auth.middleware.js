const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Authorization header yoksa
        if (!authHeader) {
            return next(
                new AppError("Token bulunamadı", 401)
            );
        }

        // Bearer TOKEN formatını kontrol et
        const [type, token] = authHeader.split(" ");

        if (type !== "Bearer" || !token) {
            return next(
                new AppError("Geçersiz authorization formatı", 401)
            );
        }

        // Token doğrula
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Token içerisindeki bilgileri request'e ekle
        req.user = decoded;

        next();

    } catch (err) {

        // JWT kaynaklı hatalar
        if (
            err.name === "JsonWebTokenError" ||
            err.name === "TokenExpiredError"
        ) {
            return next(
                new AppError(
                    "Geçersiz veya süresi dolmuş token",
                    401
                )
            );
        }

        // Diğer hataları global error middleware'e gönder
        next(err);
    }
};

module.exports = authMiddleware;