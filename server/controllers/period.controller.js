import pool from '../config/db-config.js';

export async function getPeriods(req, res) {
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

        const [rows] = await pool.execute(sql, [Number(2), Number(19), Number(1)]);
        
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
}