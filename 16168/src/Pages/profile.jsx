import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { getEnv } from "@/helpers/getEnv"
import { showToast } from "@/helpers/showToast"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/redux/user/user.slice"
import usericon from "@/assets/images/avatar.png"
import { Textarea } from "@/components/ui/textarea"
import { useFetch } from "@/hooks/useFetch"
import Loading from "@/components/Loading"
import { IoCameraOutline } from "react-icons/io5"
import { FaUser, FaEnvelope, FaInfoCircle, FaLock } from "react-icons/fa"
import Dropzone from "react-dropzone"

const Profile = () => {
  const [filepreview, setpreview] = useState(null);
  const [file, setfile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useSelector((state) => state.user);
  const userId = user?.user?._id || user?._id;

  const { data: userdata, loading, error } = useFetch(
    userId ? `${getEnv("VITE_API_BASE_URL")}/user/get-user/${userId}` : null,
    { method: "GET", credentials: "include" }
  );

  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long."),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be at least 3 characters long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userdata && userdata.success) {
      form.reset({
        name: userdata.user.name,
        email: userdata.user.email,
        bio: userdata.user.bio,
      });
    }
  }, [userdata, form]);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      if (!userId) {
        return showToast('error', 'User ID not found. Please login again.');
      }

      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }

      const userData = {
        name: values.name,
        bio: values.bio,
        email: values.email
      };

      formData.append("data", JSON.stringify(userData));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
      }

      dispatch(setUser(data.user));
      showToast("success", data.message);

    } catch (error) {
      console.error('Error updating profile:', error);
      showToast("error", error.message || "An error occurred while updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setfile(file);
    setpreview(preview);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Card className="max-w-screen-md mx-auto shadow-lg">
        <CardContent>
          <div className='flex flex-col justify-center items-center p-8'>
            <div className="relative">
              <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Avatar className='w-32 h-32 relative border-2 border-gray-200'>
                      <AvatarImage src={filepreview ? filepreview : userdata?.user?.avatar || usericon} />
                      <div className="absolute inset-0 flex justify-center items-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                        <IoCameraOutline className="text-white text-3xl" />
                      </div>
                    </Avatar>
                  </div>
                )}
              </Dropzone>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-800 mb-8">Edit Profile</h2>

            <div className="w-full max-w-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-gray-700">
                        <FaUser className="text-indigo-500" /> Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your Name" 
                          {...field} 
                          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-gray-700">
                        <FaEnvelope className="text-indigo-500" /> Email
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          {...field} 
                          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="bio" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-gray-700">
                        <FaInfoCircle className="text-indigo-500" /> Bio
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about yourself..." 
                          {...field} 
                          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 min-h-[100px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-gray-700">
                        <FaLock className="text-indigo-500" /> Password
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          {...field} 
                          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;