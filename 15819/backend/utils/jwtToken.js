export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateToken();

    res.status(statusCode)
        .cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "production"
        })
        .json({
            success: true,
            message,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });
};