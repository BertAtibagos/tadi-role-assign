import pool from '../config/db-config.js';

export async function getPrograms(req, res){
    try{
        const { yearId, periodId } = req.body;
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
                        AND o.SchlAcadYr_ID = 19
                        AND o.SchlAcadYrLvl_ID = ?
                        AND o.SchlAcadPrd_ID = ?
                    ORDER BY d.SchlDept_NAME`;

        const [rows] = await pool.execute(sql,[Number(yearId), Number(periodId)]);
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