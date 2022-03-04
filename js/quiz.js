class Quiz {
  constructor(type, questions, results) {
    this.type = type; //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
    
    this.questions = questions; //Массив с вопросами

    this.results = results; //Массив с возможными результатами

    this.score = 0; //Количество набранных очков

    this.result = 0; //Номер результата из массива

    this.current = 0; //Номер текущего вопроса
  }
 
  Click(index) {
    let value = this.questions[this.current].Click(index);
    this.score += value; //Добавляем очки

    let correct = -1;

    if(value >= 1) { //Если было добавлено хотя бы одно очко, то считаем, что ответ верный
      correct = index;
    }
    else { //Иначе ищем, какой ответ может быть правильным
      for(let i = 0; i < this.questions[this.current].answers.length; i++) {
        if(this.questions[this.current].answers[i].value >= 1) {
          correct = i;
          break;
        }
      }
    }

    this.Next();
 
    return correct;
  }
 
  Next() { //Переход к следующему вопросу
    this.current++;
      
    if(this.current >= this.questions.length) {
      this.End();
    }
  }
 
  End() { //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
    for(let i = 0; i < this.results.length; i++) {
      if(this.results[i].Check(this.score)) {
        this.result = i;
      }
    }
  }
}

class Question { //Класс, представляющий вопрос
  constructor(text, answers) {
    this.text = text;
    this.answers = answers;
  }
 
  Click(index) {
    return this.answers[index].value;
  }
}
 
class Answer { //Класс, представляющий ответ
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
}
 
class Result { //Класс, представляющий результат
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
 
  Check(value) { //Этот метод проверяет, достаточно ли очков набрал пользователь
    if(this.value <= value) {
      return true;
    }
    else {
      return false;
    }
  }
}

const results = //Массив с результатами
[
  new Result("Сізге әлі де көп оқу керек", 0),
  new Result("Тағы да оқуыңыз қажет", 2),
  new Result("Сіздің деңгейіңіз ортаңғыдан жоғары", 4),
  new Result("Сіз бұл тақырыпты керемет түсіндіңіз", 6)
];

const questions = //Массив с вопросами
[
  new Question("2 + 2 = ",
  [
    new Answer("2", 0),
    new Answer("3", 0),
    new Answer("4", 1),
    new Answer("0", 0)
  ])
];

const quiz = new Quiz(1, questions, results); //Сам тест

function Update() { //Обновление теста
  if(quiz.current < quiz.questions.length) { //Проверяем, есть ли ещё вопросы
    headElem.innerHTML = quiz.questions[quiz.current].text; //Если есть, меняем вопрос в заголовке

    buttonsElem.innerHTML = ""; //Удаляем старые варианты ответов

    for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++) { //Создаём кнопки для новых вариантов ответов
      let btn = document.createElement("button");
      btn.className = "button";

      btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

      btn.setAttribute("index", i);

      buttonsElem.appendChild(btn);
    }

    pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length; //Выводим номер текущего вопроса

    Init(); //Вызываем функцию, которая прикрепит события к новым кнопкам
  }
  else { //Если это конец, то выводим результат
    buttonsElem.innerHTML = "";
    headElem.innerHTML = quiz.results[quiz.result].text;
    pagesElem.innerHTML = "Очки: " + quiz.score;
  }
}

function Init() { //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  for(let i = 0; i < btns.length; i++) {
    //Прикрепляем событие для каждой отдельной кнопки
    //При нажатии на кнопку будет вызываться функция Click()
    btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
  }
}

function Click(index) {
  let correct = quiz.Click(index); //Получаем номер правильного ответа

  let btns = document.getElementsByClassName("button"); //Находим все кнопки

  for(let i = 0; i < btns.length; i++) { //Делаем кнопки серыми
    btns[i].className = "button button_passive";
  }

  if(quiz.type == 1) { //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
    if(correct >= 0) {
      btns[correct].className = "button button_correct";
    }

    if(index != correct) {
      btns[index].className = "button button_wrong";
    }
  }
  else { //Иначе просто подсвечиваем зелёным ответ пользователя
    btns[index].className = "button button_correct";
  }

  setTimeout(Update, 1000); //Ждём секунду и обновляем тест
}

Update();