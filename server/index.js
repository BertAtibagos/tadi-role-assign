import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import pool, { testConnection } from './config/db-config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running!' });
});

app.get('/api/years', async (req, res) => {
    try {
        const sql = 
            `SELECT
                SchlAcadYrLvlSms_ID as yrId,
                SchlAcadYrLvl_NAME as yrName
            FROM
                schoolacademicyearlevel
            WHERE SchlAcadYrLvl_STATUS = ?
            AND SchlAcadYrLvl_ISACTIVE = ?
            AND SchlAcadLvl_ID = ?
            ORDER BY SchlAcadYrLvl_RANKNO`;

        const [rows] = await pool.execute(sql, [1, 1, 2]);
        
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch files',
            error: error.message
        });
    }
});

app.get('/api/period', async (req, res) => {
    try {
        const sql =
            `SELECT DISTINCT
                    schl_acad_prd.SchlAcadPrdSms_ID AS prdId,
                    schl_acad_prd.SchlAcadPrd_NAME AS prdName
                FROM schoolacademicyearperiod AS schl_acad_yr_prd
                LEFT JOIN schoolacademicperiod AS schl_acad_prd
                    ON schl_acad_yr_prd.SchlAcadPrd_ID = schl_acad_prd.SchlAcadPrdSms_ID
                WHERE schl_acad_yr_prd.SchlAcadLvl_ID = 2
                AND schl_acad_yr_prd.SchlAcadYr_ID = 19
                AND schl_acad_yr_prd.SchlAcadYrPrd_ISACTIVE = 1`;

        const [rows] = await pool.execute(sql, [2, 19, 1]);
        
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch files',
            error: error.message
        });
    }
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    await testConnection();
});