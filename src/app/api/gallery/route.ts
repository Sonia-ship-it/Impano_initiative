import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerItems, addServerItem, type GalleryItem } from "@/lib/galleryStore";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
}

// GET - Fetch all gallery items
export async function GET() {
    const items = await getServerItems();
    return NextResponse.json({ items });
}

// POST - Add new gallery item
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const type = formData.get("type") as string;
        const title = formData.get("title") as string;

        if (!type || !title) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const id = Date.now().toString();
        const createdAt = new Date().toISOString();

        if (type === "image") {
            const file = formData.get("file") as File;
            if (!file) {
                return NextResponse.json({ error: "No file provided" }, { status: 400 });
            }

            console.log("Uploading file:", file.name, file.type, file.size);

            // Verify Cloudinary config
            if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
                console.error("Missing Cloudinary credentials");
                return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
            }

            try {
                // Convert file to base64 for Cloudinary upload
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const base64 = buffer.toString("base64");
                const dataUri = `data:${file.type};base64,${base64}`;

                console.log("Uploading to Cloudinary...");

                // Upload to Cloudinary
                const uploadResult = await cloudinary.uploader.upload(dataUri, {
                    folder: process.env.CLOUDINARY_FOLDER || "impano-gallery",
                    public_id: `gallery-${id}`,
                    resource_type: "auto",
                });

                console.log("Upload successful:", uploadResult.public_id);

                const item: GalleryItem = {
                    id,
                    type: "image",
                    title,
                    url: uploadResult.secure_url,
                    publicId: uploadResult.public_id,
                    createdAt,
                };

                await addServerItem(item);
                return NextResponse.json({ item });
            } catch (cloudinaryError) {
                console.error("Cloudinary upload error:", cloudinaryError);
                return NextResponse.json({ 
                    error: "Cloudinary upload failed", 
                    details: cloudinaryError instanceof Error ? cloudinaryError.message : "Unknown error" 
                }, { status: 500 });
            }
        } else if (type === "video") {
            const youtubeUrl = formData.get("youtubeUrl") as string;
            if (!youtubeUrl) {
                return NextResponse.json({ error: "No YouTube URL provided" }, { status: 400 });
            }

            const videoId = getYouTubeVideoId(youtubeUrl);
            if (!videoId) {
                return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
            }

            const item: GalleryItem = {
                id,
                type: "video",
                title,
                videoId,
                url: youtubeUrl,
                createdAt,
            };

            await addServerItem(item);
            return NextResponse.json({ item });
        }

        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ 
            error: "Upload failed", 
            details: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}
