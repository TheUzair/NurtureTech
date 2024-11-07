import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import childrenRoutes from './routes/childrenRoutes.js';
import caregiversRoutes from './routes/caregiversRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import financesRoutes from './routes/financesRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { Server } from 'socket.io';
import http from 'http';
import pool from './config/db.js';
import { redisClient } from './utils/cache.js';

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

const io = new Server(server, {
  cors: corsOptions,
});

let lastCheckTime = new Date();

setInterval(async () => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM change_log WHERE changed_at > ? ORDER BY changed_at DESC',
      [lastCheckTime]
    );

    if (rows.length > 0) {
      rows.forEach(async (row) => {
        if (row.table_name === 'child') {
          const cacheKey = `children_list_${row.year}`;
          await redisClient.del(cacheKey); // Invalidate child data cache
        } else if (row.table_name === 'caregiver') {
          const caregiverCacheKey = `caregivers_list_${row.year}`;
          await redisClient.del(caregiverCacheKey); // Invalidate caregiver data cache
        } else if (row.table_name === 'financial') {
          const financialCacheKey = `financial_summary_${row.year}`;
          await redisClient.del(financialCacheKey); // Invalidate financial data cache
        } else if (row.table_name === 'attendance') {
          const attendanceCacheKey = `attendance_list_${row.year}`;
          await redisClient.del(attendanceCacheKey); // Invalidate attendance data cache
        } else if (row.table_name === 'enrollment') {
          const enrollmentCacheKey = `enrollment_list_${row.year}`;
          await redisClient.del(enrollmentCacheKey); // Invalidate enrollment data cache
        }

        // Emit update to frontend for each table update (child, caregiver, financial, attendance, enrollment)
        io.emit(`${row.table_name}_updates`, {
          operation: row.operation,
          changed_id: row.changed_id,
          timestamp: row.changed_at,
        });
      });

      // Update last check time to the timestamp of the latest change
      lastCheckTime = new Date();
    }

    // Clean up old entries from change_log periodically
    await pool.query(
      'DELETE FROM change_log WHERE changed_at < NOW() - INTERVAL 1 HOUR'
    );
  } catch (error) {
    console.error('Error fetching from change_log:', error);
  }
}, 5000); // Check every 5 seconds


// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the AspireIT API!');
});

// Set up routes
app.use('/api/children', childrenRoutes);
app.use('/api/caregivers', caregiversRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/finances', financesRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api', authRoutes);

app.use(errorHandler);

export { app, server };
