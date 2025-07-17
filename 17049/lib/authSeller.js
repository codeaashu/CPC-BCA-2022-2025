import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const authSeller = async (userId) => {
    try {
        // FIX: clerkClient is not a function — remove ()
        const user = await clerkClient.users.getUser(userId);

        if (user.publicMetadata.role === 'seller') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
};

export default authSeller;
