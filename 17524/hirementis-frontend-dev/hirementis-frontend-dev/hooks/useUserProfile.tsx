// "use client"
import { useState, useEffect } from 'react';

// Mock user data
const userData = {
  name: "Reva",
  email: "alex.johnson@example.com",
  bio: "Frontend Developer with 3+ years of experience in React, TypeScript, and modern web technologies.",
  interviews: [
    {
      id: 1,
      position: "Frontend Developer",
      company: "TechCorp",
      date: "2023-05-20T14:30:00",
      score: 85,
      status: "Completed"
    },
    {
      id: 2,
      position: "React Developer",
      company: "WebSolutions Inc.",
      date: "2023-05-15T10:00:00",
      score: 72,
      status: "Completed"
    },
    {
      id: 3,
      position: "UI Engineer",
      company: "DesignPro",
      date: "2023-05-10T11:15:00",
      score: 90,
      status: "Completed"
    },
    {
      id: 4,
      position: "Frontend Team Lead",
      company: "InnovateTech",
      date: "2023-05-05T15:45:00",
      score: 68,
      status: "Completed"
    }
  ]
};

export interface UserProfileData {
  name: string;
  email: string;
  bio: string;
  interviews: {
    id: number;
    position: string;
    company: string;
    date: string;
    score: number;
    status: string;
  }[];
}

export const useUserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfileData | null>(null);
  
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setUser(userData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 70) return "text-mint-600 bg-mint-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return {
    isLoading,
    user,
    getScoreColor,
    formatDate
  };
};