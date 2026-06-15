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

// KV Configuration
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

// Helper to query Vercel KV REST API
async function queryKV(command: string[]): Promise<any> {
    if (!KV_URL || !KV_TOKEN) return null;
    try {
        const response = await fetch(KV_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${KV_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(command),
        });
        if (!response.ok) {
            console.error("KV error response:", await response.text());
            return null;
        }
        const data = await response.json();
        return data.result;
    } catch (e) {
        console.error("Error querying KV:", e);
        return null;
    }
}

// Ensure data directory exists
async function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        await mkdir(DATA_DIR, { recursive: true });
    }
}

// Read items from KV or file
async function readItems(): Promise<GalleryItem[]> {
    if (KV_URL && KV_TOKEN) {
        const result = await queryKV(["GET", "gallery_items"]);
        if (result) {
            try {
                return JSON.parse(result);
            } catch (e) {
                console.error("Failed to parse KV gallery items:", e);
            }
        }
    }

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

// Write items to KV or file
async function writeItems(items: GalleryItem[]): Promise<void> {
    if (KV_URL && KV_TOKEN) {
        await queryKV(["SET", "gallery_items", JSON.stringify(items)]);
    }

    try {
        await ensureDataDir();
        await writeFile(DATA_FILE, JSON.stringify(items, null, 2));
    } catch (error) {
        console.error("Error writing gallery data:", error);
        // Only throw if KV is not configured (to support read-only file systems on serverless)
        if (!KV_URL || !KV_TOKEN) {
            throw error;
        }
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
