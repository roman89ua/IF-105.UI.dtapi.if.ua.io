export class MockedData {
  studentObject = {
    student_surname: 'Kravtsiv',
    student_name: 'Kostiantyn',
    student_fname: 'Igorovych'
  };
  logs = [
    {
      log_id: '258',
      user_id: '159',
      test_id: '6',
      log_date: '2020-03-05',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80'
    },
    {
      log_id: '259',
      user_id: '159',
      test_id: '6',
      log_date: '2020-03-09',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80'
    },
    {
      log_id: '260',
      user_id: '155',
      test_id: '6',
      log_date: '2020-03-10',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80'
    },
    {
      log_id: '261',
      user_id: '155',
      test_id: '6',
      log_date: '2020-03-20',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80'
    }
  ];
  tests = [
    {
      test_id: '1',
      test_name: 'Фінальний тест',
      subject_id: '1',
      tasks: '20',
      time_for_test: '100',
      enabled: '1',
      attempts: '1'
    },
    {
      test_id: '4',
      test_name: 'Вступ',
      subject_id: '23',
      tasks: '10',
      time_for_test: '15',
      enabled: '1',
      attempts: '99'
    },
    {
      test_id: '5',
      test_name: 'Для модульного тестування',
      subject_id: '142',
      tasks: '11',
      time_for_test: '15',
      enabled: '1',
      attempts: '3'
    },
    {
      test_id: '1',
      test_name: 'Фінальний тест',
      subject_id: '142',
      tasks: '11',
      time_for_test: '15',
      enabled: '1',
      attempts: '3'
    },
    {
      test_id: '6',
      test_name: 'Вступ',
      subject_id: '142',
      tasks: '11',
      time_for_test: '15',
      enabled: '1',
      attempts: '3'
    }
  ];
  users = [
    {
      user_id: '153',
      gradebook_id: 'АКС-011',
      student_surname: 'Гринюк',
      student_name: 'Роман',
      student_fname: 'Михайлович',
      group_id: '84',
      plain_password: '12345678',
      photo: ''
    },
    {
      user_id: '154',
      gradebook_id: 'АКС-012',
      student_surname: 'Гушпит',
      student_name: 'Олександр',
      student_fname: 'Володимирович',
      group_id: '84',
      plain_password: '12345678',
      photo: ''
    },
    {
      user_id: '156',
      gradebook_id: 'АКС-014',
      student_surname: 'Іванців',
      student_name: 'Михайло',
      student_fname: 'Васильович',
      group_id: '84',
      plain_password: '12345678',
      photo: ''
    },
    {
      user_id: '155',
      gradebook_id: 'АКС-014',
      student_surname: 'Тест',
      student_name: 'Михайло',
      student_fname: 'Васильович',
      group_id: '84',
      plain_password: '12345678',
      photo: ''
    },
    {
      user_id: '159',
      gradebook_id: 'АКС-014',
      student_surname: 'Тестовий',
      student_name: 'Михайло',
      student_fname: 'Васильович',
      group_id: '84',
      plain_password: '12345678',
      photo: ''
    }
  ];
  date = {
    startDate: 'Mon Mar 09 2020 00:00:00 GMT+0200 (Восточная Европа, стандартное время)',
    endDate: 'Thu Mar 19 2020 00:00:00 GMT+0200 (Восточная Европа, стандартное время)'
  };
  properEndDate = 'Thu Mar 19 2020 23:59:59 GMT+0200 (Восточная Европа, стандартное время)';
  data = [
    [{
      log_id: '258',
      user_id: '159',
      test_id: '6',
      log_date: '2020-03-05',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80'
    },
    {
      log_id: '259',
      user_id: '159',
      test_id: '6',
      log_date: '2020-03-09',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80'
    },
    {
      log_id: '260',
      user_id: '155',
      test_id: '6',
      log_date: '2020-03-10',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80'
    },
    {
      log_id: '261',
      user_id: '155',
      test_id: '6',
      log_date: '2020-03-20',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80'
    }],
    [{
      test_id: '6',
      test_name: 'Вступ',
      subject_id: '142',
      tasks: '11',
      time_for_test: '15',
      enabled: '1',
      attempts: '3'
    }],
    [{
      user_id: '155',
      gradebook_id: 'АКС-014',
      student_surname: 'Тест',
      student_name: 'Михайло',
      student_fname: 'Васильович',
      group_id: '84',
      plain_password: '12345678',
      photo: ''
    },
    {
      user_id: '159',
      gradebook_id: 'АКС-014',
      student_surname: 'Тестовий',
      student_name: 'Михайло',
      student_fname: 'Васильович',
      group_id: '84',
      plain_password: '12345678',
      photo: ''
    }]
  ];
  protocolObjects = [
    {
      log_id: '258',
      user_id: '159',
      test_id: '6',
      log_date: '2020-03-05',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80',
      testName: 'Вступ',
      userName: 'Тестовий Михайло Васильович'
    },
    {
      log_id: '259',
      user_id: '159',
      test_id: '6',
      log_date: '2020-03-09',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80',
      testName: 'Вступ',
      userName: 'Тестовий Михайло Васильович'
    },
    {
      log_id: '260',
      user_id: '155',
      test_id: '6',
      log_date: '2020-03-10',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80',
      testName: 'Вступ',
      userName: 'Тест Михайло Васильович'
    },
    {
      log_id: '261',
      user_id: '155',
      test_id: '6',
      log_date: '2020-03-20',
      log_time: '16:35:05',
      remote_ip: '185.112.172.80',
      testName: 'Вступ',
      userName: 'Тест Михайло Васильович'
    }
  ];
}
