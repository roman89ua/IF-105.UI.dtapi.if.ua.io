export class ChartData {
  trueAnswers = JSON.stringify(
    [
      { question_id: '23', true: 1 },
      { question_id: '48', true: 1 },
      { question_id: '50', true: 1 },
      { question_id: '64', true: 0 }
    ]);
  falseAnswers = JSON.stringify(
    [
      { question_id: '23', true: 0 },
      { question_id: '48', true: 0 },
      { question_id: '50', true: 0 },
      { question_id: '64', true: 0 }
    ]);
  correctAnswers = [
    { level: 0, task: 3 },
    { level: 1, task: 0 },
    { level: 2, task: 1 },
    { level: 3, task: 2 },
    { level: 4, task: 0 },
  ];
  ratesArr = [3, 0, 3, 6, 0];
  testDetails = [
    {
      id: '4',
      test_id: '5',
      level: '1',
      tasks: '2',
      rate: '1'
    },
    {
      id: '6',
      test_id: '5',
      level: '4',
      tasks: '2',
      rate: '3'
    },
    {
      id: '5',
      test_id: '5',
      level: '2',
      tasks: '3',
      rate: '2'
    },
    {
      id: '6',
      test_id: '5',
      level: '5',
      tasks: '2',
      rate: '3'
    },
    {
      id: '6',
      test_id: '5',
      level: '3',
      tasks: '2',
      rate: '3'
    }
  ];
  sortTestDetails = [
    {
      id: '4',
      test_id: '5',
      level: '1',
      tasks: '2',
      rate: '1'
    },
    {
      id: '5',
      test_id: '5',
      level: '2',
      tasks: '3',
      rate: '2'
    },
    {
      id: '6',
      test_id: '5',
      level: '3',
      tasks: '2',
      rate: '3'
    },
    {
      id: '6',
      test_id: '5',
      level: '4',
      tasks: '2',
      rate: '3'
    },
    {
      id: '6',
      test_id: '5',
      level: '5',
      tasks: '2',
      rate: '3'
    }
  ];
  labelsArr = [
    '1 рівень',
    '2 рівень',
    '3 рівень',
    '4 рівень',
    '5 рівень',
  ];
  testDforRatesByLvl = [
    { id: '7', test_id: '6', level: '1', tasks: '3', rate: '4' },
    { id: '8', test_id: '6', level: '2', tasks: '6', rate: '4' },
    { id: '9', test_id: '6', level: '3', tasks: '2', rate: '3' },
    { id: '10', test_id: '6', level: '4', tasks: '2', rate: '2' },
    { id: '10', test_id: '6', level: '5', tasks: '2', rate: '2' },
  ];
  answersDetails = [
    { question_id: '23', test_id: '6', question_text: '[DB/SQL] Згідно із наведениE &#180;Іван%&#180;;', level: '1', type: '2' },
    { question_id: '48', test_id: '6', question_text: '[DB/SQL]х', level: '1', type: '1' },
    { question_id: '50', test_id: '6', question_text: '[HTML_FORMS] ', level: '4', type: '1' },
    { question_id: '67', test_id: '6', question_text: '[JS] ', level: '5', type: '3' },
    { question_id: '75', test_id: '6', question_text: '[JS]', level: '5', type: '1' },
    { question_id: '78', test_id: '6', question_text: '[jQ] ', level: '4', type: '1' },
    { question_id: '90', test_id: '6', question_text: '[jQ]', level: '4', type: '3' },
    { question_id: '219', test_id: '6', question_text: 'Введіть вказаний номер 12345', level: '1', type: '4' },
    { question_id: '255', test_id: '6', question_text: 'Введіть цифри, вказані на екрані 87345', level: '5', type: '4' }
  ];
  ratesByLvl = [
    {
      level: 0,
      task: 3
    },
    {
      level: 1,
      task: 0
    },
    {
      level: 2,
      task: 0
    },
    {
      level: 3,
      task: 3
    },
    {
      level: 4,
      task: 3
    }
  ];
  maxRates = [2, 6, 6, 6, 6];
}
