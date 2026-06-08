import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { removeServerItem, findServerItem } from "@/lib/galleryStore";

// DELETE - Remove gallery item
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const item = await findServerItem(id);

        if (!item) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        // If it's an image, delete the file
        if (item.type === "image" && item.url.startsWith("/uploads/")) {
            const filePath = path.join(process.cwd(), "public", item.url);
            if (existsSync(filePath)) {
                try {
                    await unlink(filePath);
                } catch (err) {
                    console.error("Failed to delete file:", err);
                }
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
