import pool from '../config/db-config.js';

export async function getSection(req, res){
    try{
        const {yearLvlId,periodId,deptId} = req.body;
        const sql = `SELECT DISTINCT
                        sec.SchlAcadSecSms_ID sec_id,
                        sec.SchlAcadSec_NAME sec_name,
                        sec.SchlAcadSec_CODE sec_code,
                        crse.SchlDept_ID
                    FROM schoolenrollmentsubjectoffered AS off
                    LEFT JOIN schoolacademicsection AS sec
                        ON off.SchlAcadSec_ID = sec.SchlAcadSecSms_ID
                    LEFT JOIN schoolacademiccourses AS crse
                        ON off.SchlAcadCrses_ID = crse.SchlAcadCrseSms_ID
                    WHERE crse.SchlDept_ID = ?
                        AND off.SchlAcadLvl_ID = 2
                        AND off.SchlAcadYr_ID = 19
                        AND off.SchlAcadPrd_ID = ?
                        AND off.SchlAcadYrLvl_ID = ?
                        AND off.SchlEnrollSubjOff_STATUS = 1
                        AND off.SchlEnrollSubjOff_ISACTIVE = 1
                        AND sec.SchlAcadSecSms_ID IS NOT NULL
                        AND sec.SchlAcadSec_NAME IS NOT NULL
                        AND sec.SchlAcadSec_CODE IS NOT NULL
                    ORDER BY sec.SchlAcadSec_NAME`;

        const [rows] = await pool.execute(sql,[Number(deptId), Number(periodId), Number(yearLvlId)]);
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
}