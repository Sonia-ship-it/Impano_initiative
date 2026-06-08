import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { getServerItems, addServerItem, type GalleryItem } from "@/lib/galleryStore";

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

            // Create uploads directory if it doesn't exist
            const uploadsDir = path.join(process.cwd(), "public", "uploads");
            if (!existsSync(uploadsDir)) {
                await mkdir(uploadsDir, { recursive: true });
            }

            // Save file
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${id}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            const filePath = path.join(uploadsDir, fileName);
            await writeFile(filePath, buffer);

            const item: GalleryItem = {
                id,
                type: "image",
                title,
                url: `/uploads/${fileName}`,
                createdAt,
            };

            await addServerItem(item);
            return NextResponse.json({ item });
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
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
