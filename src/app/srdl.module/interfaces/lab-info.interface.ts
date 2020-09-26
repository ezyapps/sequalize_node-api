export interface ILabInfo {
    id: string;
    code: string;
    edu_inst_id: string;
    lab_creation_date: Date;
    room_length: number;
    room_width: number;
    no_of_pc: number;
    student_capacity: number;
    LAT: number;
    LON: number;
    last_visit_date: Date;
    visit_by: string;
    last_visit_comment: string;
}