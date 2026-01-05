import { users, scanHistory, type User, type InsertUser, type ScanHistory, type InsertScanHistory } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createScanHistory(scan: InsertScanHistory): Promise<ScanHistory>;
  getScanHistory(userId: number): Promise<ScanHistory[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private scanHistory: Map<number, ScanHistory>;
  private currentUserId: number;
  private currentScanId: number;

  constructor() {
    this.users = new Map();
    this.scanHistory = new Map();
    this.currentUserId = 1;
    this.currentScanId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.googleId === googleId,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async createScanHistory(insertScan: InsertScanHistory): Promise<ScanHistory> {
    const id = this.currentScanId++;
    const scan: ScanHistory = {
      ...insertScan,
      id,
      scannedAt: new Date(),
    };
    this.scanHistory.set(id, scan);
    return scan;
  }

  async getScanHistory(userId: number): Promise<ScanHistory[]> {
    return Array.from(this.scanHistory.values())
      .filter((scan) => scan.userId === userId)
      .sort((a, b) => b.scannedAt.getTime() - a.scannedAt.getTime());
  }
}

export const storage = new MemStorage();
