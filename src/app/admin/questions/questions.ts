export interface IQuestion {
    question_id?: number;
    test_id: number;
    question_text: string;
    level: number;
    type: number;
    //string for error case
    answers?: IAnswer[] | string;
}
export interface IAnswer {
    answer_id: number;
    true_answer: number;
    question_id?: number;
    answer_text: string;
    attachment: string;
    error?: string | boolean; //FIX
    touched?: boolean
}