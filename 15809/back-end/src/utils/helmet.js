import helmet from "helmet";

const httpHelmet = helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "res.cloudinary.com"], // Allow images from Cloudinary
            mediaSrc: ["'self'", "res.cloudinary.com"], // Allow videos from Cloudinary
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
        },
    },
});

export default httpHelmet;
