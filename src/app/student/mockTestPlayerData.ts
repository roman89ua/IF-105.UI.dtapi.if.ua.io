export const mockTest = {
    test_id: 1,
    test_name: 'Фінальний тест',
    subject_id: 1,
    tasks: 20,
    time_for_test: 100,
    enabled: 1,
    attempts: 1
};

export const mockLogin = {
    roles: ['login', 'student'],
    id: '162',
    username: 'yurik',
    response: 'logged'
};

export const expectData = {
    id: 281, response: 'ok'
};

export const error = {
    response: 'User is making test at current moment'
};

export const logStartTestErrorMock = {
    response: 'You can start tests which are only for you!!!'
};

export const mockTestDetails = [
    {
        id: 71,
        test_id: 62,
        level: 1,
        tasks: 1,
        rate: 10
    }
];

export const getQuestionIdsByLevelRandMock =
    [
        { question_id: '483' }
    ];

export const entityValuesMock =
    [
        {
            question_id: '483',
            test_id: '62',
            question_text: 'CS:GO is',
            level: '1',
            type: '1',
            attachment: ''
        }
    ];
export const getAnswerByQuestionMock =
    [
     { answer_id: '1101',
        question_id: '483',
        answer_text: 'GAME!',
        attachment: ''
    }
    ];
export const listQuestionsMock = {
    ...entityValuesMock[0],
    answers: [getAnswerByQuestionMock[0]]
};
