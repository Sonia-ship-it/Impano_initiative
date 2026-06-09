"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Check if already authenticated
        const auth = sessionStorage.getItem("admin_auth");
        if (auth === "authenticated") {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Check environment variable first, then localStorage, then default
        const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
        const savedPassword = localStorage.getItem("admin_password");
        const defaultPassword = "impano2024admin";
        
        const validPassword = envPassword || savedPassword || defaultPassword;
        
        if (password === validPassword) {
            sessionStorage.setItem("admin_auth", "authenticated");
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Invalid password");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("admin_auth");
        sessionStorage.removeItem("admin_password");
        setIsAuthenticated(false);
        setPassword("");
    };

    if (isLoading) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.spinner} />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className={styles.loginPage}>
                <div className={styles.loginCard}>
                    <div className={styles.logoSection}>
                        <div className={styles.logoCircle}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h1>Admin Portal</h1>
                        <p>Impano Initiative Funds</p>
                    </div>

                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Access Code</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                required
                                className={styles.input}
                            />
                        </div>
                        {error && <div className={styles.error}>{error}</div>}
                        <button type="submit" className={styles.loginBtn}>
                            <span>Access Portal</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.adminDashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.brandLogo}>
                        <div className={styles.logoIcon}>IF</div>
                        <div>
                            <div className={styles.brandName}>IMPANO</div>
                            <div className={styles.brandSub}>ADMIN</div>
                        </div>
                    </div>
                </div>

                <nav className={styles.sidebarNav}>
                    <a href="#gallery" className={`${styles.navItem} ${styles.active}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span>Gallery Manager</span>
                    </a>
                    <a href="/" className={styles.navItem}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <span>Back to Site</span>
                    </a>
                </nav>

                <PasswordManager />

                <button onClick={handleLogout} className={styles.logoutBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Logout</span>
                </button>
            </aside>

            <main className={styles.mainContent}>
                <GalleryManager />
            </main>
        </div>
    );
}

function PasswordManager() {
    const [showModal, setShowModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        const savedPassword = localStorage.getItem("admin_password") || "impano2024admin";

        if (currentPassword !== savedPassword) {
            setError("Current password is incorrect");
            return;
        }

        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        localStorage.setItem("admin_password", newPassword);
        setSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
            setShowModal(false);
            setSuccess(false);
        }, 2000);
    };

    return (
        <>
            <button onClick={() => setShowModal(true)} className={styles.passwordBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6" />
                    <path d="M1 12h6m6 0h6" />
                </svg>
                <span>Change Password</span>
            </button>

            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Change Password</h2>
                            <button onClick={() => setShowModal(false)} className={styles.closeBtn}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleChangePassword} className={styles.passwordForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="current">Current Password</label>
                                <input
                                    type="password"
                                    id="current"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter current password"
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="new">New Password</label>
                                <input
                                    type="password"
                                    id="new"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password (min 8 characters)"
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="confirm">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirm"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    required
                                    className={styles.input}
                                />
                            </div>

                            {error && <div className={styles.error}>{error}</div>}
                            {success && (
                                <div className={styles.success}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    <span>Password changed successfully!</span>
                                </div>
                            )}

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setShowModal(false)} className={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

function GalleryManager() {
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const fetchGalleryItems = async () => {
        try {
            const response = await fetch("/api/gallery", {
                cache: "no-store",
                headers: {
                    "Cache-Control": "no-cache",
                },
            });
            const data = await response.json();
            setItems(data.items || []);
        } catch (error) {
            console.error("Error fetching gallery items:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            const response = await fetch(`/api/gallery/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setItems(items.filter((item) => item.id !== id));
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item");
        }
    };

    return (
        <div className={styles.galleryManager}>
            <header className={styles.contentHeader}>
                <div className={styles.headerLeft}>
                    <div>
                        <h1 className={styles.pageTitle}>Gallery Manager</h1>
                        <p className={styles.pageDesc}>
                            Manage images and videos displayed in the gallery
                            <span className={styles.itemCount}>{items.length} items</span>
                        </p>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.viewToggle}>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`${styles.viewBtn} ${viewMode === "grid" ? styles.active : ""}`}
                            title="Grid View"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`${styles.viewBtn} ${viewMode === "list" ? styles.active : ""}`}
                            title="List View"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                <line x1="3" y1="18" x2="3.01" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <button onClick={() => setShowUploadModal(true)} className={styles.addBtn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Add Media</span>
                    </button>
                </div>
            </header>

            {isLoading ? (
                <div className={styles.loadingState}>
                    <div className={styles.spinner} />
                    <p>Loading gallery items...</p>
                </div>
            ) : (
                <div className={viewMode === "grid" ? styles.galleryGrid : styles.galleryList}>
                    {items.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            </div>
                            <h3>No media yet</h3>
                            <p>Start by adding your first image or video</p>
                            <button onClick={() => setShowUploadModal(true)} className={styles.emptyBtn}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                <span>Add First Media</span>
                            </button>
                        </div>
                    ) : (
                        items.map((item, index) => (
                            <div
                                key={item.id}
                                className={viewMode === "grid" ? styles.galleryCard : styles.listItem}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className={styles.cardMedia}>
                                    {item.type === "video" ? (
                                        <div className={styles.videoThumb}>
                                            <iframe
                                                src={`https://www.youtube.com/embed/${item.videoId}`}
                                                title={item.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : (
                                        <img src={item.url} alt={item.title} />
                                    )}
                                    <div className={styles.cardType}>
                                        {item.type === "video" ? (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.cardInfo}>
                                    <h3>{item.title}</h3>
                                    <p>{new Date(item.createdAt).toLocaleDateString("en-US", { 
                                        year: "numeric", 
                                        month: "short", 
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</p>
                                </div>
                                <button onClick={() => handleDelete(item.id)} className={styles.deleteBtn} title="Delete">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}

            {showUploadModal && (
                <UploadModal
                    onClose={() => setShowUploadModal(false)}
                    onSuccess={(newItem) => {
                        setItems([newItem, ...items]);
                        setShowUploadModal(false);
                    }}
                />
            )}
        </div>
    );
}

function UploadModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (item: any) => void }) {
    const [type, setType] = useState<"image" | "video">("image");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("type", type);
            formData.append("title", title);

            if (type === "image" && file) {
                formData.append("file", file);
            } else if (type === "video") {
                formData.append("youtubeUrl", youtubeUrl);
            }

            const response = await fetch("/api/gallery", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                onSuccess(data.item);
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Add Media</h2>
                    <button onClick={onClose} className={styles.closeBtn}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.uploadForm}>
                    <div className={styles.typeSelector}>
                        <button
                            type="button"
                            className={`${styles.typeBtn} ${type === "image" ? styles.active : ""}`}
                            onClick={() => setType("image")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <span>Image</span>
                        </button>
                        <button
                            type="button"
                            className={`${styles.typeBtn} ${type === "video" ? styles.active : ""}`}
                            onClick={() => setType("video")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7" />
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                            <span>YouTube Video</span>
                        </button>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter media title"
                            required
                            className={styles.input}
                        />
                    </div>

                    {type === "image" ? (
                        <div className={styles.formGroup}>
                            <label htmlFor="file">Image File</label>
                            <input
                                type="file"
                                id="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                required
                                className={styles.fileInput}
                            />
                        </div>
                    ) : (
                        <div className={styles.formGroup}>
                            <label htmlFor="youtube">YouTube URL</label>
                            <input
                                type="url"
                                id="youtube"
                                value={youtubeUrl}
                                onChange={(e) => setYoutubeUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                required
                                className={styles.input}
                            />
                        </div>
                    )}

                    <div className={styles.modalActions}>
                        <button type="button" onClick={onClose} className={styles.cancelBtn}>
                            Cancel
                        </button>
                        <button type="submit" disabled={isUploading} className={styles.submitBtn}>
                            {isUploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
