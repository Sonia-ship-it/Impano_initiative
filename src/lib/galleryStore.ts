// Cloudinary-based gallery storage
// Images stored on Cloudinary CDN, metadata in JSON file

import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

interface GalleryItem {
    id: string;
    type: "image" | "video";
    title: string;
    url: string;
    videoId?: string;
    publicId?: string; // Cloudinary public ID for deletion
    createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "gallery.json");

// Ensure data directory exists
async function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        await mkdir(DATA_DIR, { recursive: true });
    }
}

// Read items from file
async function readItems(): Promise<GalleryItem[]> {
    try {
        await ensureDataDir();
        if (!existsSync(DATA_FILE)) {
            // Initialize with empty array if file doesn't exist
            await writeFile(DATA_FILE, JSON.stringify([], null, 2));
            return [];
        }
        const content = await readFile(DATA_FILE, "utf-8");
        return JSON.parse(content);
    } catch (error) {
        console.error("Error reading gallery data:", error);
        return [];
    }
}

// Write items to file
async function writeItems(items: GalleryItem[]): Promise<void> {
    try {
        await ensureDataDir();
        await writeFile(DATA_FILE, JSON.stringify(items, null, 2));
    } catch (error) {
        console.error("Error writing gallery data:", error);
        throw error;
    }
}

// Get all items
export async function getServerItems(): Promise<GalleryItem[]> {
    return await readItems();
}

// Add new item
export async function addServerItem(item: GalleryItem): Promise<void> {
    const items = await readItems();
    items.unshift(item); // Add to beginning
    await writeItems(items);
}

// Remove item
export async function removeServerItem(id: string): Promise<boolean> {
    const items = await readItems();
    const index = items.findIndex((item) => item.id === id);
    
    if (index === -1) return false;
    
    items.splice(index, 1);
    await writeItems(items);
    return true;
}

// Find item
export async function findServerItem(id: string): Promise<GalleryItem | undefined> {
    const items = await readItems();
    return items.find((item) => item.id === id);
}

export type { GalleryItem };
