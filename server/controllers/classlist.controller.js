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
                        schl_stud.SchlStudSms_ID AS student_id
                    FROM schoolenrollmentsubjectoffered AS schl_enr_subj_off
                    LEFT JOIN schoolacademicsection AS schl_acad_sec
                        ON schl_enr_subj_off.SchlAcadSec_ID = schl_acad_sec.SchlAcadSecSms_ID
                    LEFT JOIN schooltadi AS tadi
                        ON schl_enr_subj_off.SchlEnrollSubjOffSms_ID = tadi.schlenrollsubjoff_id
                    LEFT JOIN schoolstudent AS schl_stud
                        ON tadi.schlstud_id = schl_stud.SchlStudSms_ID
                    LEFT JOIN systemuser AS sys_user
                        ON schl_stud.SchlStudSms_ID = sys_user.SchlUser_ID
                    LEFT JOIN schoolenrollmentregistration AS schl_enr_reg
                        ON schl_stud.SchlEnrollRegColl_ID = schl_enr_reg.SchlEnrollRegSms_ID
                    LEFT JOIN schoolenrollmentregistrationstudentinformation AS schl_reg_stud
                        ON schl_enr_reg.SchlEnrollRegSms_ID = schl_reg_stud.SchlEnrollReg_ID
                    WHERE schl_acad_sec.SchlAcadSecSms_ID = ?
                        AND schl_enr_subj_off.SchlEnrollSubjOff_ISACTIVE = 1
                        AND schl_enr_subj_off.SchlEnrollSubjOff_STATUS = 1
                    ORDER BY schl_reg_stud.SchlEnrollRegStudInfo_LAST_NAME, schl_reg_stud.SchlEnrollRegStudInfo_FIRST_NAME`;

        const [rows] = await pool.execute(sql,[Number(sectionId)]);
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