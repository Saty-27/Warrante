import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertScanHistorySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Google OAuth routes
  app.get("/api/auth/google", async (req, res) => {
    // Redirect to Google OAuth
    const googleAuthUrl = `https://accounts.google.com/oauth/authorize?client_id=${process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id"}&redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/api/auth/google/callback")}&response_type=code&scope=email%20profile`;
    res.redirect(googleAuthUrl);
  });

  app.get("/api/auth/google/callback", async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({ message: "Authorization code missing" });
    }

    try {
      // Exchange code for access token
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id",
          client_secret: process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret",
          code: code as string,
          grant_type: "authorization_code",
          redirect_uri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/api/auth/google/callback",
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (!tokenData.access_token) {
        throw new Error("Failed to get access token");
      }

      // Get user info from Google
      const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });

      const userData = await userResponse.json();
      
      // Create or find user
      let user = await storage.getUserByGoogleId(userData.id);
      
      if (!user) {
        const newUser = insertUserSchema.parse({
          username: userData.name || userData.email,
          email: userData.email,
          googleId: userData.id,
        });
        user = await storage.createUser(newUser);
      }

      // Set user session
      (req.session as any).userId = user.id;
      
      res.redirect("/");
    } catch (error) {
      console.error("Google OAuth error:", error);
      res.status(500).json({ message: "Authentication failed" });
    }
  });

  // Get current user
  app.get("/api/user", async (req, res) => {
    const userId = (req.session as any)?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  });

  // Save scan result
  app.post("/api/scans", async (req, res) => {
    try {
      const userId = (req.session as any)?.userId;
      
      const scanData = insertScanHistorySchema.parse({
        userId: userId || null,
        content: req.body.content,
        type: req.body.type || "unknown",
      });

      const scan = await storage.createScanHistory(scanData);
      res.json(scan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid scan data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save scan" });
    }
  });

  // Get scan history
  app.get("/api/scans", async (req, res) => {
    const userId = (req.session as any)?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const scans = await storage.getScanHistory(userId);
    res.json(scans);
  });

  // Logout
  app.post("/api/auth/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
