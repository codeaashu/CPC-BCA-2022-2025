import { FaShippingFast, FaLeaf, FaHeart } from 'react-icons/fa';
import { FaBolt, FaRegClock, FaCalendarCheck, FaFire } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FiUser, FiSmartphone, FiMail, FiHome } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import { GiChefToque, GiFoodTruck } from 'react-icons/gi';
import IA1 from './IA1.png';
import IA2 from './IA2.png';
import IA3 from './IA3.png';
import IA4 from './IA4.png';
import IA5 from './IA5.png';
import IA6 from './IA6.png';

import Kebab from "./Kebab.png";
import ChickenTikka from "./ChickenTikka.png";
import ChickenChargha from "./ChickenChargha.png";
import DesiChowmein from "./DesiChowmein.png";
import GulabJamun from "./GulabJamun.png";
import MasalaDosa from "./MasalaDosa.png";
import PaneerTikka from "./PannerTikka.png";
import PalakPaneer from "./PalakPaneer.png";

import BannerImage from "./BannerImage.png";
import Image1 from "./Image1.png";
import Image2 from "./Image2.png";
import Image3 from "./Image3.png";
import Image4 from "./Image4.png";
import Video from "./Video.mp4";

// ABOUT PAGE
export const features = [
    {
        id: 1,
        title: "Instant Delivery",
        text: "30-minute delivery guarantee in metro areas",
        icon: FaShippingFast, // store the component reference
        img: IA1,
    },
    {
        id: 2,
        title: "Master Chefs",
        text: "Michelin-star trained culinary experts",
        icon: GiChefToque,
        img: IA2,
    },
    {
        id: 3,
        title: "Premium Quality",
        text: "Locally sourced organic ingredients",
        icon: FaLeaf,
        img: IA3,
    },
];

export const stats = [
    {
        number: '10M+',
        label: 'Deliveries',
        icon: GiFoodTruck,
        gradient: 'from-amber-500 via-orange-400 to-yellow-600',
    },
    {
        number: '98%',
        label: 'Satisfaction',
        icon: FaHeart,
        gradient: 'from-rose-500 via-amber-500 to-yellow-500',
    },
    {
        number: '500+',
        label: 'Cities',
        icon: FaLeaf,
        gradient: 'from-emerald-500 via-amber-500 to-yellow-600',
    },
    {
        number: '24/7',
        label: 'Support',
        icon: FaRegClock,
        gradient: 'from-amber-500 via-orange-400 to-rose-500',
    },
];

export const teamMembers = [
    {
        name: "Marco Yansen",
        role: "Executive Chef",
        img: IA4,
        bio: "3 Michelin stars | Italian cuisine specialist",
        delay: 0.1,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
    {
        name: "Amit Singh",
        role: "Pastry Chef",
        img: IA5,
        bio: "World Baking Champion | French desserts expert",
        delay: 0.3,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
    {
        name: "Akash Trivedi",
        role: "Sushi Chef",
        img: IA6,
        bio: "5th generation sushi chef | Traditional techniques",
        delay: 0.5,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
];

// ABOUT HOMEPAGE
export const aboutfeature = [
    { icon: FaBolt, title: "Instant Ordering", text: "Seamless digital experience", color: "from-amber-400 to-orange-500" },
    { icon: FaRegClock, title: "Always Open", text: "24/7 premium service", color: "from-rose-400 to-pink-600" },
    { icon: FaCalendarCheck, title: "Exclusive Booking", text: "Priority reservations", color: "from-emerald-400 to-cyan-600" },
    { icon: FaFire, title: "Signature Dishes", text: "Chef's special creations", color: "from-purple-400 to-indigo-600" }
];

// SPECIAL MENU
export const cardData = [
    { id: 1, title: 'Kebab', rating: 4.5, hearts: 105, description: 'Juicy grilled meat with authentic spices', image: Kebab, popular: true, price: '₹40' },
    { id: 2, title: 'Chicken Tikka', rating: 5.0, hearts: 155, description: 'Tender chicken marinated in sauce', image: ChickenTikka, bestseller: true, price: '₹140' },
    { id: 3, title: 'Desi Chowmein', rating: 4.2, hearts: 85, description: 'Spicy Asian noodles with a local twist', image: DesiChowmein, price: '₹60' },
    { id: 4, title: 'Chicken Chargha', rating: 4.8, hearts: 285, description: 'Crispy golden fried whole chicken', image: ChickenChargha, special: true, price: '₹200' },
];
export const additionalData = [
    { id: 5, title: 'Paneer Tikka', rating: 4.8, hearts: 210, description: 'Cottage cheese marinated in spices', image: PaneerTikka, popular: true, price: '₹220' },
    { id: 6, title: 'Masala Dosa', rating: 4.5, hearts: 165, description: 'Crispy rice crepe with potato filling', image: MasalaDosa, price: '₹180' },
    { id: 7, title: 'Palak Paneer', rating: 4.7, hearts: 190, description: 'Spinach curry with cottage cheese', image: PalakPaneer, price: '₹200' },
    { id: 8, title: 'Gulab Jamun', rating: 4.9, hearts: 275, description: 'Golden dumplings in rose syrup', image: GulabJamun, special: true, price: '₹30' },
];

// FOOTER 
export const socialIcons = [
    { icon: FaFacebook, link: '//', color: '#3b5998', label: 'Facebook' },
    { icon: FaInstagram, link: '//', color: '#E1306C', label: 'Instagram' },
    { icon: FaXTwitter, link: '//', color: '#000', label: 'X' },
    { icon: FaYoutube, link: '//', color: '#FF0000', label: 'Youtube' },
];

// LOGIN 
export const inputBase = "w-full rounded-lg bg-[#2D1B0E] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600";
export const iconClass = "absolute top-1/2 transform -translate-y-1/2 left-3 text-amber-400";

// CONTACT
export const contactFormFields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name', Icon: FiUser },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 12345 67890', pattern: "[+]{0,1}[0-9]{10,13}", Icon: FiSmartphone },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your.email@example.com', Icon: FiMail },
    { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your delivery address', Icon: FiHome },
    { label: 'Dish Name', name: 'dish', type: 'text', placeholder: 'Enter dish name (e.g., Butter Chicken)', Icon: FaUtensils },
];

// BANNER
export const bannerAssets = {
    bannerImage: BannerImage,
    orbitImages: [Image1, Image2, Image3, Image4],
    video: Video,
};