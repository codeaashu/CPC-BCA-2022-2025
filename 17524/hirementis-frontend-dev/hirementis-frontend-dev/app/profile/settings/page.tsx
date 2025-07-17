import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileBuilder from "./components/ProfileBuilder";

const Index = () => {
  return (
    <div
      className={`min-h-screen transition-colors duration-300 section-padding`}
    >
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Build Your Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Create a compelling profile that showcases your skills and
            personality
          </p>
        </div> */}

        <ProfileBuilder />
      </div>
    </div>
  );
};

export default Index;
