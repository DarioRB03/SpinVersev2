import { Component } from '@angular/core';

interface Question {
  question: string;
  options: { text: string; isCorrect: boolean }[];
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss']
})
export class QuizPage {
  questions: Question[] = [
    {
      question: '¿Cuál es la capital de Francia?',
      options: [
        { text: 'Madrid', isCorrect: false },
        { text: 'París', isCorrect: true },
        { text: 'Roma', isCorrect: false },
        { text: 'Berlín', isCorrect: false }
      ]
    },
    {
      question: '¿Cuál es el planeta más grande del sistema solar?',
      options: [
        { text: 'Marte', isCorrect: false },
        { text: 'Júpiter', isCorrect: true },
        { text: 'Saturno', isCorrect: false },
        { text: 'Tierra', isCorrect: false }
      ]
    },
    {
      question: '¿Cuántos colores tiene el arco iris?',
      options: [
        { text: '5', isCorrect: false },
        { text: '7', isCorrect: true },
        { text: '8', isCorrect: false },
        { text: '6', isCorrect: false }
      ]
    }
  ];

  currentQuestion: number = 0;
  score: number = 0;
  showAnswer: boolean = false;
  isCorrect: boolean = false;

  selectOption(option: { text: string; isCorrect: boolean }) {
    if (!this.showAnswer) {
      this.showAnswer = true;
      this.isCorrect = option.isCorrect;
      if (this.isCorrect) {
        this.score++;
      }
    }
  }

  nextQuestion() {
    this.showAnswer = false;
    this.currentQuestion++;
  }

  restartQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.showAnswer = false;
  }
}
