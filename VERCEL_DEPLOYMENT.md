# 🚀 Deploying Impano Initiative to Vercel

This guide provides a comprehensive, step-by-step walkthrough to deploy the Impano Initiative application to Vercel, ensuring that all features (including image uploads, video additions, password changes, and payment integrations) work perfectly in a serverless environment.

---

## 📋 Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Step 1: Cloudinary Setup (For Image Uploads)](#step-1-cloudinary-setup-for-image-uploads)
3. [Step 2: Vercel KV Setup (For Serverless Metadata Storage)](#step-2-vercel-kv-setup-for-serverless-metadata-storage)
4. [Step 3: Deploy to Vercel](#step-3-deploy-to-vercel)
5. [Step 4: Configure Environment Variables in Vercel](#step-4-configure-environment-variables-in-vercel)
6. [Step 5: Verifying the Deployed Site](#step-5-verifying-the-deployed-site)

---

## 1. Prerequisites
- A **GitHub**, **GitLab**, or **Bitbucket** account with the project code pushed.
- A **Vercel** account (linked to your Git provider).
- A **Cloudinary** account (Free tier is more than sufficient).

---

## Step 1: Cloudinary Setup (For Image Uploads)
Since Vercel has a read-only and ephemeral filesystem, all media files must be uploaded to a external Cloud Delivery Network (CDN). We use **Cloudinary** for this.

1. Sign up or log in to [Cloudinary](https://cloudinary.com).
2. Navigate to your **Dashboard**.
3. Locate the following credentials:
   - **Cloud Name** (e.g., `dxy123456`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz012`)
4. Save these values; you will add them to Vercel as environment variables.

---

## Step 2: Vercel KV Setup (For Serverless Metadata Storage)
Because serverless functions are stateless, storing the gallery metadata in a local JSON file (`data/gallery.json`) will not persist across requests. 
We have integrated Vercel KV (Redis) as the serverless store. Vercel KV is free, fast, and takes one click to link.

1. Go to your **Vercel Dashboard**.
2. Click on the **Storage** tab.
3. Click **Create** and select **KV** (Redis).
4. Name your database (e.g., `impano-kv-store`) and select a primary region close to your target audience.
5. Click **Create**. Keep this store open; we will link it to our project during deployment.

---

## Step 3: Deploy to Vercel

### Option A: From GitHub (Recommended)
1. In the **Vercel Dashboard**, click **Add New...** > **Project**.
2. Select your repository from the imported Git repositories.
3. Keep the default framework preset as **Next.js** and build settings as-is.
4. Expand the **Environment Variables** section (see [Step 4](#step-4-configure-environment-variables-in-vercel) below to add them before hitting deploy).
5. Click **Deploy**.

### Option B: Via Vercel CLI
If you prefer deploying from your command line:
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Log in and deploy:
   ```bash
   vercel
   ```
3. Follow the CLI prompt instructions.

---

## Step 4: Configure Environment Variables in Vercel

Add the following environment variables to your project in Vercel (**Settings** > **Environment Variables**):

| Key | Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `your_cloud_name` | Cloudinary Cloud Name |
| `CLOUDINARY_API_KEY` | `your_api_key` | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | `your_api_secret` | Cloudinary API Secret (Keep Secret) |
| `CLOUDINARY_FOLDER` | `impano-gallery` | Optional: Destination folder name |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | `your_secure_password` | Default Admin password (minimum 8 chars) |

### Link Vercel KV Database to your Deployment:
1. In your project page on Vercel, navigate to the **Storage** tab.
2. Under **Connect Database**, select the KV database you created in Step 2.
3. Click **Connect**.
4. This automatically injects the necessary environment variables (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.) into your environment. No manual copy-paste needed!

---

## Step 5: Verifying the Deployed Site

Once the build finishes successfully, open your deployed link and test the following:

1. **Social Media Links Check:**
   - Scroll to the footer or go to the contact section.
   - Click the links for **X (Twitter)**, **TikTok**, and **LinkedIn** to ensure they redirect to the updated handles:
     - TikTok: `@impanofunds`
     - LinkedIn: `impano-initiative-funds-a55a9a3b7`
     - X/Twitter: `ImpanoFunds`

2. **Accessing the Admin Portal:**
   - Navigate to `/admin`.
   - Enter your `NEXT_PUBLIC_ADMIN_PASSWORD` (or default `impano2024admin` if not set) to gain access.

3. **Uploading Images & Videos:**
   - Click **Add Media** in the Gallery Manager.
   - Try uploading an image. This uploads the image to Cloudinary and saves the metadata securely to Vercel KV.
   - Try adding a YouTube video URL (e.g., `https://www.youtube.com/watch?v=...`).
   - Confirm that the uploaded items instantly appear on the public Gallery page.

4. **Changing Password Flow:**
   - In the `/admin` page, click the **Change Password** button in the sidebar.
   - Enter your current password, type a new secure password (min 8 chars), and confirm.
   - Log out, and attempt logging in with the new password.
   - *Note: User password changes are saved securely in your browser's persistent storage, prioritizing local settings over env defaults.*
