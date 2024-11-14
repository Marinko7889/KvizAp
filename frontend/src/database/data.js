
export let answers = [];
const fetchQuestions = async () => {
    const response = await fetch('http://localhost:4000/api/questions');
    const data = await response.json();
  
    const ids = [];
    const questions = [];
    const options = [];
    //const answer = [];
  
    data.questions.forEach(question => {
      ids.push(question.id);
      questions.push(question.question);
      options.push(question.options);
      answers.push(question.answer);
    });
  
    console.log(ids);
    console.log(questions);
    console.log(options);
    console.log(answers);
  
    const formattedQuestions = questions.map((question, index) => ({
      id: ids[index],
      question: question,
      options: options[index],
      answer: answers[index]
    }));
  
    return formattedQuestions;
  };
  
  export default fetchQuestions();


// fetch('http://localhost:4000/api/questions')
//   .then(response => response.json())
//   .then(data => {
//     data.questions.forEach(question => {
//       ids.push(question.id);
//       questions.push(question.question);
//       options.push(question.options);
//       answer.push(question.answer);
//     });

//     console.log(ids);
//     console.log(questions);
//     console.log(options);
//     console.log(answer);



//     // Ovdje možete izvršiti daljnje radnje s organiziranim nizovima
//     {
//             id: 1;
//             question: questions[0];
//             options: options[0]



//         };
//     console.log(questions[0])
//     console.log(questions[1])
//     })
//     .catch(error => {
//         console.error('Dogodila se greška:', error);
//     });
//console.log(questions[0])


// export default [{
//     id: 1,
//     question: "What is Python?",
//     options: [
//         'A high-level programming language',
//         'A low-level programming language',
//         'A machine language',]



// },
// {
//     id: 2,
//     question: "Which of the following is not a primitive data type in Python?",
//     options: [
//         'int',
//         'str',
//         'array',
//     ]
// },
// {
//     id: 3,
//     question: "What is the output of the following code: `print(3 + 4 * 5)`?",
//     options: [
//         '20',
//         '35',
//         '23',
//     ]
// },
// {
//     id: 4,
//     question: "What is the output of the following code: `print('hello' * 3)`?",
//     options: [
//         'hellohellohello',
//         '3hello',
//         'hello3',
//     ]
// },
// {
//     id: 5,
//     question: "Which of the following is not a valid way to declare a variable in Python?",
//     options: [
//         'let x = 5',
//         'x = 5',
//         'x, y = 5, 6',
//     ]
// },
// {
//     id: 6,
//     question: "What is the output of the following code: `print(len('hello'))`?",
//     options: [
//         '5',
//         '4',
//         '6',
//     ]
// },
// {
//     id: 7,
//     question: "What is the output of the following code: `print('hello world'[3:7])`?",
//     options: [
//         'lo w',
//         'lo wo',
//         'l',
//     ]
// },
// {
//     id: 8,
//     question: "Which of the following is not a valid way to create a list in Python?",
//     options: [
//         '[1, 2, 3]',
//         'list(1, 2, 3)',
//         'list(range(1, 4))',
//     ]
// },
// {
//     id: 9,
//     question: "What is the output of the following code: `print('hello world'.split())`?",
//     options: [
//         "['hello', 'world']",
//         "'hello world'",
//         "['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']",
//     ]
// },
// {
//     id: 10,
//     question: "Which of the following is not a valid way to define a function in Python?",
//     options: [
//         'def my_function():',
//         'my_function = lambda x: x * 2',
//         'my_function(x) = x * 2',
//     ]
// }
// ];

//export const answers = [0, 2, 1, 0, 0, 0, 0, 1, 0, 2];


