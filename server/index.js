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
                WHERE schl_acad_yr_prd.SchlAcadLvl_ID = ?
                AND schl_acad_yr_prd.SchlAcadYr_ID = ?
                AND schl_acad_yr_prd.SchlAcadYrPrd_ISACTIVE = ?`;

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

app.post('/api/programs', async(req, res)=>{
    try{
        const { yearId, periodId } = req.query;
        const sql = `SELECT DISTINCT
                        d.SchlDeptSms_ID AS dept_id,
                        d.SchlDept_CODE   AS dept_code,
                        d.SchlDept_NAME   AS dept_name
                    FROM schooldepartment d
                    JOIN schoolacademiccourses c ON c.SchlDept_ID = d.SchlDeptSms_ID
                    JOIN schoolenrollmentsubjectoffered o ON o.SchlAcadCrses_ID = c.SchlAcadCrseSms_ID
                    JOIN schoolacademicyearperiod yp
                        ON yp.SchlAcadLvl_ID = o.SchlAcadLvl_ID
                        AND yp.SchlAcadYr_ID  = o.SchlAcadYr_ID
                        AND yp.SchlAcadPrd_ID = o.SchlAcadPrd_ID
                    WHERE o.SchlAcadLvl_ID = 2
                        AND o.SchlAcadYr_ID = ?
                        AND o.SchlAcadPrd_ID = ?
                        ORDER BY d.SchlDept_NAME`;

        const [rows] = await pool.execute(sql,[yearId, periodId]);
        res.json({
            success: true,
            data: rows
        });
    } catch(err){
        console.error('Error fetching programs:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch programs',
            error: err.message
        });
    }
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    await testConnection();
});