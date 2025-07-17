
import Footer from '@/components/Footer';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  email: string;
}

interface Founder {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  socialLinks: SocialLinks;
}

interface SocialIconProps {
  platform: keyof SocialLinks;
  url: string;
}

const MeetTheFounders: React.FC = () => {
  const founders: Founder[] = [
    {
      id: 1,
      name: "Diwakar",
      title: "Founder & CEO",
      image: "/certiimg.jpg", // Put image in public/images/founders/
     bio: "𝗛𝗲𝘆 𝘁𝗵𝗲𝗿𝗲! 👋 I'm Diwakar Jaiswal a passionate tech explorer who loves building on the web with 𝗛𝗧𝗠𝗟, 𝗖𝗦𝗦, 𝗝𝗮𝘃𝗮𝗦𝗰𝗿𝗶𝗽𝘁, 𝗥𝗲𝗮𝗰𝘁, 𝗡𝗲𝘅𝘁𝗝𝗦, 𝗡𝗼𝗱𝗲𝗝𝗦, 𝗘𝘅𝗽𝗿𝗲𝘀𝘀𝗝𝗦 & 𝗠𝗼𝗻𝗴𝗼𝗗𝗕. I'm also diving deep into the world of 𝗔𝗜 𝗔𝗴𝗲𝗻𝘁𝘀 and 𝗟𝗮𝗿𝗴𝗲 𝗟𝗮𝗻𝗴𝘂𝗮𝗴𝗲 𝗠𝗼𝗱𝗲𝗹𝘀 (𝗟𝗟𝗠𝘀) to build intelligent, interactive experiences I thrive on challenges, love turning ideas into impact, and enjoy connecting with our ever-growing 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 𝗰𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆 to learn, share, and grow together!",
      socialLinks: {
        linkedin: "www.linkedin.com/in/diwakar-jaiswal",
        twitter: "https://twitter.com/suprabhat_3",
         github: "https://github.com/Suprabhat3/",
        email: "jaiswaldiwakar91@gmail.com"
      }
    },
    {
      id: 2,
      name: "Ritesh",
      title: "Co-Founder & CTO",
      image: "/ritesh.jpg", // Put image in public/images/founders/
      bio: "𝗛𝗲𝘆 𝘁𝗵𝗲𝗿𝗲! 👋 I'm Diwakar Jaiswal, a tech enthusiast who loves playing with web technologies like 𝗛𝗧𝗠𝗟, 𝗖𝗦𝗦, 𝗥𝗲𝗮𝗰𝘁, 𝗡𝗼𝗱𝗲𝗝𝗦, 𝗘𝘅𝗽𝗿𝗲𝘀𝘀𝗝𝗦, 𝗠𝗼𝗻𝗴𝗼𝗗𝗕, and 𝗡𝗲𝘅𝘁𝗝𝗦 to create amazing things. Every challenge is an exciting opportunity for me, and I absolutely enjoy bringing creative ideas to life. When I'm not coding cool solutions, you'll find me sharing knowledge and 𝗰𝗼𝗻𝗻𝗲𝗰𝘁𝗶𝗻𝗴 with our awesome 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 𝗰𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆!",
      socialLinks: {
        linkedin: "www.linkedin.com/in/diwakar-jaiswal",
         twitter: "https://x.com/_PiyushDev",
        github: "https://github.com/diwakar-cimage",
        email: "jaiswaldiwakar91@gmail.com"
      }
    }
  ];

  const SocialIcon: React.FC<SocialIconProps> = ({ platform, url }) => {
    const iconMap: Record<keyof SocialLinks, React.ComponentType> = {
      linkedin: FaLinkedin,
      twitter: FaTwitter,
      github: FaGithub,
      email: FaEnvelope
    };
    
    const Icon = iconMap[platform];
    const href = platform === 'email' ? `mailto:${url}` : url;
    
    return (
      <a 
        href={href}
        target={platform !== 'email' ? "_blank" : "_self"}
        rel={platform !== 'email' ? "noopener noreferrer" : ""}
        className="text-gray-600 hover:text-emerald-500 transition-colors duration-300 text-xl"
      >
        <Icon />
      </a>
    );
  };

  return (
    <>
      <Head>
        <title>Meet the Founders - HireMentis</title>
        <meta name="description" content="Meet the passionate founders behind HireMentis who are revolutionizing interview preparation with AI-powered solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">HireMentis</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Home</a>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Jobs</a>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Features</a>
                <a href="#" className="text-emerald-600 font-medium">About</a>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Pricing</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet the <span className="text-emerald-600">Founders</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The passionate minds behind HireMentis who are dedicated to transforming 
              how people prepare for interviews with cutting-edge AI technology.
            </p>
          </div>

          {/* Founders Grid */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {founders.map((founder) => (
              <div 
                key={founder.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Profile Image */}
                <div className="relative overflow-hidden">
                  <Image 
                    src={founder.image}
                    alt={founder.name}
                    width={500}
                    height={220}
                    className="w-full h-100 object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={founder.id <= 2} // Priority loading for first 2 images
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {founder.name}
                    </h3>
                    <p className="text-emerald-600 font-semibold text-lg">
                      {founder.title}
                    </p>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6 text-base">
                    {founder.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex space-x-4 pt-4 border-t border-gray-100">
                    {Object.entries(founder.socialLinks).map(([platform, url]) => (
                      <SocialIcon key={platform} platform={platform as keyof SocialLinks} url={url} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default MeetTheFounders;