export interface IQuestion {
    question_id: number;
    test_id: number;
    question_text: string;
    level: number;
    type: number;
    answers?: any;
}