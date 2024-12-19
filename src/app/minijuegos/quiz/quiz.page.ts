import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit, OnDestroy {
  questions = [
    {
      question: '¿Cuál es la capital de Francia?',
      options: [
        { text: 'Madrid', correct: false },
        { text: 'París', correct: true },
        { text: 'Roma', correct: false },
        { text: 'Berlín', correct: false },
      ],
    },
    {
      question: '¿Quién escribió "Cien años de soledad"?',
      options: [
        { text: 'Pablo Neruda', correct: false },
        { text: 'Gabriel García Márquez', correct: true },
        { text: 'Mario Vargas Llosa', correct: false },
        { text: 'Isabel Allende', correct: false },
      ],
    },
    {
      question: '¿Cuál es el planeta más grande del sistema solar?',
      options: [
        { text: 'Júpiter', correct: true },
        { text: 'Saturno', correct: false },
        { text: 'Marte', correct: false },
        { text: 'Tierra', correct: false },
      ],
    },
    {
      question: '¿En qué año llegó el hombre a la Luna?',
      options: [
        { text: '1965', correct: false },
        { text: '1969', correct: true },
        { text: '1971', correct: false },
        { text: '1963', correct: false },
      ],
    },
    {
      question: '¿Quién pintó la Mona Lisa?',
      options: [
        { text: 'Vincent van Gogh', correct: false },
        { text: 'Leonardo da Vinci', correct: true },
        { text: 'Pablo Picasso', correct: false },
        { text: 'Claude Monet', correct: false },
      ],
    },
    {
      question: '¿Qué gas se encuentra en mayor cantidad en la atmósfera?',
      options: [
        { text: 'Oxígeno', correct: false },
        { text: 'Nitrógeno', correct: true },
        { text: 'Dióxido de carbono', correct: false },
        { text: 'Hidrógeno', correct: false },
      ],
    },
    {
      question: '¿Cuál es el metal más ligero?',
      options: [
        { text: 'Hierro', correct: false },
        { text: 'Aluminio', correct: false },
        { text: 'Litio', correct: true },
        { text: 'Cobre', correct: false },
      ],
    },
    {
      question: '¿Cuál es la moneda de Japón?',
      options: [
        { text: 'Dólar', correct: false },
        { text: 'Yuan', correct: false },
        { text: 'Yen', correct: true },
        { text: 'Won', correct: false },
      ],
    },
    {
      question: '¿Cuál es el país más grande del mundo?',
      options: [
        { text: 'China', correct: false },
        { text: 'Canadá', correct: false },
        { text: 'Rusia', correct: true },
        { text: 'Estados Unidos', correct: false },
      ],
    },
    {
      question: '¿Quién fue el primer presidente de los Estados Unidos?',
      options: [
        { text: 'Abraham Lincoln', correct: false },
        { text: 'George Washington', correct: true },
        { text: 'Thomas Jefferson', correct: false },
        { text: 'John Adams', correct: false },
      ],
    },
  ];

  currentQuestion = 0;
  score = 0;
  showAnswer = false;
  isCorrect = false;
  selectedOption: any = null;
  timeLeft = 10;
  timerInterval: any;
  quizFinished = false;
  coinsEarned = 0;
  userId: string | null = null;

  constructor(
    private firestoreService: FirestoreService,
    private auth: AngularFireAuth
  ) {
    this.auth.currentUser.then(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }


  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        this.nextQuestion();
      }
    }, 1000);
  }

  selectOption(option: any) {
    if (this.showAnswer) return;
    this.selectedOption = option;
    this.isCorrect = option.correct;
    this.showAnswer = true;

    if (this.isCorrect) {
      this.score++;
      this.addCoins(1);
    }
  }

  nextQuestion() {
    this.showAnswer = false;
    this.selectedOption = null;
    this.isCorrect = false;

    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      this.timeLeft = 10; // Reiniciar el tiempo
    } else {
      clearInterval(this.timerInterval);
      this.quizFinished = true;
    }
  }

  restartQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.showAnswer = false;
    this.isCorrect = false;
    this.selectedOption = null;
    this.timeLeft = 10;
    this.quizFinished = false;
    this.coinsEarned = 0;
    this.startTimer();
  }

  addCoins(coins: number) {
    if (this.userId) {
      this.firestoreService.updateUserCoins(this.userId, coins).then(() => {
        this.coinsEarned += coins; 
        console.log(`${coins} monedas añadidas al usuario.`);
      }).catch(error => {
        console.error('Error al añadir monedas:', error);
      });
    }
  }
}
