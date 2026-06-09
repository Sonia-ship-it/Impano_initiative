import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { removeServerItem, findServerItem } from "@/lib/galleryStore";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// DELETE - Remove gallery item
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const item = await findServerItem(id);

        if (!item) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        // If it's an image stored on Cloudinary, delete it
        if (item.type === "image" && item.publicId) {
            try {
                await cloudinary.uploader.destroy(item.publicId);
            } catch (err) {
                console.error("Failed to delete from Cloudinary:", err);
                // Continue with metadata deletion even if Cloudinary fails
            }
        }

        // Remove from store
        const removed = await removeServerItem(id);
        
        if (!removed) {
            return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
