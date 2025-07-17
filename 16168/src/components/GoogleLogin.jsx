
// import React from 'react';
// import { Button } from './ui/button';
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '@/helpers/firebase';
// import { FcGoogle } from "react-icons/fc";
// import { showToast } from '@/helpers/showToast';
//  import { getEnv } from '@/helpers/getEnv';

// import { useNavigate } from 'react-router-dom';
// import { RouteIndex } from '@/helpers/RouteName';
// import { setUser } from '@/redux/user/user.slice';
// import { useDispatch } from "react-redux";

// const GoogleLogin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

   
//   const handleLogin = async () => {
//     try {
//       provider.setCustomParameters({ prompt: 'select_account' });

//       const googleResponse = await signInWithPopup(auth, provider);
//       const user = googleResponse.user;

//       if (!user) throw new Error("Google sign-in failed. Please try again.");

//       const bodyData = {
//         name: user.displayName,
//         email: user.email,
//         avatar: user.photoURL
//       };

//       console.log("API URL:", getEnv('VITE_API_BASE_URL') + "/auth/google-login");

//       const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/google-login`, {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(bodyData)
//       });

//       let data;
//       try {
//         data = await response.json();
//       } catch (err) {
//         return showToast('error', 'Invalid server response');
//       }

//       if (!response.ok) {
//         return showToast('error', data?.message || 'Something went wrong');
//       }

//       dispatch(setUser(data.user));
//       showToast('success', data.message);
//       navigate(RouteIndex);
//     } catch (error) {
//       console.error("Login Error:", error);
//       showToast('error', error.message || "Login failed. Try again.");
//     }
//   };

//   return (
//     <Button variant="outline" className="w-full" onClick={handleLogin}>
//       <FcGoogle />
//       Continue with Google
//     </Button>
//   );
// };

// export default GoogleLogin;
import React from 'react';
import { Button } from './ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helpers/firebase';
import { RouteIndex } from '@/helpers/RouteName';
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv'; // ✅ fixed import name
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';

const GoogleLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const googleResponse = await signInWithPopup(auth, provider);
            const user = googleResponse.user;

            const bodyData = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL
            };

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/google-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(bodyData)
            });

            const data = await response.json();

            if (!response.ok) {
                return showToast('error', data.message);
            }

            dispatch(setUser(data.user));
            navigate(RouteIndex);
            showToast('success', data.message);
        } catch (error) {
            showToast('error', error.message);
        }
    };

    return (
        <Button variant="outline" className="w-full gap-2" onClick={handleLogin}>
            <FcGoogle size={20} />
            Continue With Google
        </Button>
    );
};

export default GoogleLogin;
