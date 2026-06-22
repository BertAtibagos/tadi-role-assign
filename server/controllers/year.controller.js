import pool from '../config/db-config.js';

export async function getYears(req, res){
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

        const [rows] = await pool.execute(sql, [Number(1), Number(1), Number(2)]);
        
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