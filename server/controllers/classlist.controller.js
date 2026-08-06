import pool from '../config/db-config.js';

export async function getClassList(req, res){
    try{
        const {sectionId} = req.body;
        const sql = `SELECT DISTINCT
                        CONCAT(
                            schl_reg_stud.SchlEnrollRegStudInfo_LAST_NAME,
                            ', ',
                            schl_reg_stud.SchlEnrollRegStudInfo_FIRST_NAME,
                            ' ',
                            schl_reg_stud.SchlEnrollRegStudInfo_MIDDLE_NAME
                        ) AS student_name,
                        schl_stud.SchlStudSms_ID AS student_id,
                        sys_user.SysUserPriv_ID AS privilage
                    FROM schoolenrollmentassessment AS ass
                    LEFT JOIN schoolstudent AS schl_stud
                        ON ass.SchlStud_ID = schl_stud.SchlStudSms_ID
                    LEFT JOIN schoolenrollmentregistrationstudentinformation AS schl_reg_stud
                        ON schl_stud.SchlEnrollRegColl_ID = schl_reg_stud.SchlEnrollReg_ID
                    LEFT JOIN systemuser AS sys_user
                        ON schl_stud.SchlStudSms_ID = sys_user.SysUserSms_ID
                    WHERE ass.SchlAcadSec_ID = ?
                    AND ass.SchlEnrollAss_STATUS = 1
                    ORDER BY schl_reg_stud.SchlEnrollRegStudInfo_LAST_NAME,
                            schl_reg_stud.SchlEnrollRegStudInfo_FIRST_NAME`;

        const [rows] = await pool.execute(sql,[Number(sectionId)]);
        res.json({
            success: true,
            data: rows
        });
    } catch(err){
        console.error('Error fetching class list:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch class list',
            error: err.message
        });
    }
}