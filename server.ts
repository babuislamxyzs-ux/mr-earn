import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';
import firebaseConfig from './firebase-applet-config.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

// In Firebase Admin V12/V13, we specify databaseId via the firestore() method
const db = admin.firestore(firebaseConfig.firestoreDatabaseId);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
  });

  // TimeWall Postback Secure Handler
  app.get('/api/postback/timewall', async (req, res) => {
    const { user_id, points, secret, transaction_id } = req.query;

    if (secret !== process.env.TIMEWALL_POSTBACK_SECRET) {
      console.error('TimeWall Postback: Invalid secret attempt');
      return res.status(403).send('Invalid secret');
    }

    const userId = user_id as string;
    const rewardPoints = parseFloat(points as string);
    
    if (!userId || isNaN(rewardPoints)) {
      return res.status(400).send('Invalid parameters');
    }

    try {
      const userRef = db.collection('users').doc(userId);
      
      await db.runTransaction(async (t) => {
        const userSnap = await t.get(userRef);
        if (!userSnap.exists) {
          throw new Error('User not found');
        }

        const userData = userSnap.data();
        const newBalance = (userData?.balance || 0) + rewardPoints;
        const newTotalEarned = (userData?.totalEarned || 0) + rewardPoints;
        const newXp = (userData?.xp || 0) + Math.floor(rewardPoints * 10);

        t.update(userRef, { 
          balance: newBalance,
          totalEarned: newTotalEarned,
          xp: newXp
        });

        // Create transaction record
        const transRef = db.collection('transactions').doc();
        t.set(transRef, {
          userId,
          amount: rewardPoints,
          type: 'earn',
          description: `TimeWall Reward (TID: ${transaction_id})`,
          status: 'completed',
          timestamp: Date.now()
        });
      });

      console.log(`[TimeWall] Successfully rewarded user ${userId}: ${rewardPoints} points`);
      res.send('1'); // TimeWall expects '1' on success
    } catch (error) {
      console.error('TimeWall Postback Error:', error);
      res.status(500).send('Transaction failed');
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[Server] Failed to start:', err);
  process.exit(1);
});
