# Example operations

## Creating teachers
```
mutation{
  newTeacher(name: "Roberto", surname: "Levanini", displayName: "r9" ){
    id
    name
    surname
    display_name
  }
}
```
## Creating students
```
mutation{
  newStudent(name: "Jorjor", surname: "Well"){
    id
    name
    surname
    display_name
  }
}
```
## Fetching teachers and students
```
query{
  getTeachers{
    id
    name
    surname
    display_name
  }
  getStudents{
    id
    name
    surname
    display_name
  }
}
```
## Creating a test set
This mutation creates test set with one of each possible question type.
```
mutation{
  newTestSet(newTestSetData: {
    teacher_id: 1,
    name: "Test for computer scientist",
    questions_data:[
      {
        question_text: "What is 2^10",
        type: SINGLE_CHOICE,
        correct_answers:[
          "1024"
        ],
        wrong_answers:[
          "512",
          "1048",
          "2048"
        ]
      },
      {
        question_text: "Select compiled languages",
        type: MULTIPLE_CHOICE
        correct_answers: [
          "C",
          "C++",
          "Rust"
        ],
        wrong_answers:[
          "Python",
          "JavaScript",
          "Matlab"
        ]
      },
      {
        question_text: "Type the surname of the best mathematician: Leonhard ..."
        type: PLAIN_TEXT
        correct_answers:["Euler"],
        wrong_answers: []
      },
      {
        question_text: "Sort graphs from lowest to highest chromatic number",
        type: SORTING,
        correct_answers: [
          "Full binary three",
          "Triangle",
          "K_5",
          "K_10"
        ]
      }
    ]
  }){
    id
    name
    teacher{
      id
      name
      surname
    }
    questions{
      question_text
      type
      answer_propositions{
        proposition
        character
      }
      correct_answers{
        answer
      }
    }
  }
}
```

## Getting test sets
```
query{
	getTestSets{
    name
    id
  }
}
```

## Fetching questions for specified test

```
query{
	getTestSetQuestions(testId:1){
    teacher{
      name
      surname
    }
    questions{
      id
      question_text
      answer_propositions{
        proposition
        character
      }
    }
  }
}
```

## Checking answers for a test

```
query{
  getResult(answersToSubmit: {
    question_ids: [ 1,2,3,4 ],
    answers: ["b", "cef", "euler", "cbad"]
  }){
    max_points
    obtained_points
  }
}

```