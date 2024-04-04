import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionnaryService } from '../dictionnary.service';
import { EndModaleComponent } from '../end-modale/end-modale.component';

@Component({
  selector: 'app-playing-zone',
  standalone: true,
  imports: [CommonModule, EndModaleComponent],
  templateUrl: './playing-zone.component.html',
  styleUrl: './playing-zone.component.css',
})
export class PlayingZoneComponent implements OnInit {
  currentWord: string = '';
  currentGuesses: string[] = [];
  currentGuessesIndex: number = 0;
  maxGuesses: number = 6;
  colors: string[][] = [];
  isPlaying: boolean = true;

  allLetters = [
    { letter: 'a', color: '' },
    { letter: 'b', color: '' },
    { letter: 'c', color: '' },
    { letter: 'd', color: '' },
    { letter: 'e', color: '' },
    { letter: 'f', color: '' },
    { letter: 'g', color: '' },
    { letter: 'h', color: '' },
    { letter: 'i', color: '' },
    { letter: 'j', color: '' },
    { letter: 'k', color: '' },
    { letter: 'l', color: '' },
    { letter: 'm', color: '' },
    { letter: 'n', color: '' },
    { letter: 'o', color: '' },
    { letter: 'p', color: '' },
    { letter: 'q', color: '' },
    { letter: 'r', color: '' },
    { letter: 's', color: '' },
    { letter: 't', color: '' },
    { letter: 'u', color: '' },
    { letter: 'v', color: '' },
    { letter: 'w', color: '' },
    { letter: 'x', color: '' },
    { letter: 'y', color: '' },
    { letter: 'z', color: '' },
  ];

  constructor(private service: DictionnaryService) {}

  ngOnInit() {
    this.service.getWord().subscribe((word: any) => {
      this.currentWord = word.word as string;
    });
    for (let i = 0; i < this.maxGuesses; i++) {
      this.currentGuesses[i] = '';
      this.colors.push(['', '', '', '', '']);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isPlaying) {
      let currentGuess = this.currentGuesses[this.currentGuessesIndex];
      if (this.isLetter(event.key) && currentGuess.length < 5) {
        this.currentGuesses[this.currentGuessesIndex] +=
          event.key.toLocaleLowerCase();
      } else if (event.key === 'Backspace') {
        this.currentGuesses[this.currentGuessesIndex] = this.currentGuesses[
          this.currentGuessesIndex
        ].slice(0, -1);
      } else if (event.key === 'Enter' && currentGuess.length === 5) {
        this.validateGuess(currentGuess);
      }
      console.log(currentGuess);
    }
  }

  validateGuess(guess: string) {
    this.service.checkGuessExist(guess).subscribe({
      next: (value) => {
        this.lettersColor();
        if (guess === this.currentWord) {
          console.log('win');
          this.isPlaying = false;
        } else if (this.currentGuessesIndex == 5) {
          console.log('lose');
          this.isPlaying = false;
        } else {
          this.currentGuessesIndex++;
        }
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
    });
    console.log('checking if guess correspond to current word');
  }

  isLetter(str: string) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
  }

  getGuess(guess: string) {
    if (guess === '') {
      return ['', '', '', '', ''];
    }
    let ret = guess.toLocaleUpperCase().split('');
    if (ret.length !== 5) {
      ret = ret.concat(['', '', '', '', '']);
      ret = ret.slice(0, 5 - ret.length);
    }
    return ret;
  }

  lettersColor() {
    let lettersToGuess = this.currentWord.split('');
    const colors = ['', '', '', '', ''];

    for (const [index, letter] of this.currentGuesses[this.currentGuessesIndex]
      .split('')
      .entries()) {
      console.log(
        'Checking letter ',
        letter,
        ' in ',
        lettersToGuess,
        ' of the word ',
        this.currentWord
      );
      if (letter === this.currentWord.split('')[index]) {
        colors[index] = 'green';
        this.allLetters.filter((object) => object.letter === letter)[0].color =
          'green';
        lettersToGuess.splice(lettersToGuess.indexOf(letter), 1);
      } else if (lettersToGuess.includes(letter)) {
        colors[index] = 'orange';
        const temp = this.allLetters.filter(
          (object) => object.letter === letter
        )[0];
        if (temp.color !== 'green') {
          temp.color = 'orange';
        }
        lettersToGuess.splice(lettersToGuess.indexOf(letter), 1);
      } else {
        colors[index] = 'red';
        const temp = this.allLetters.filter(
          (object) => object.letter === letter
        )[0];
        if (temp.color !== 'green' && temp.color !== 'orange') {
          temp.color = 'red';
        }
      }
    }

    let unfoundArray = this.currentWord
      .split('')
      .filter((letter, index) => colors[index] !== 'green');

    for (const [index, letter] of this.currentGuesses[this.currentGuessesIndex]
      .split('')
      .entries()) {
      if (colors[index] === 'orange' && !unfoundArray.includes(letter)) {
        colors[index] = 'red';
        unfoundArray = unfoundArray.splice(unfoundArray.indexOf(letter), 1);
      }
    }
    this.colors[this.currentGuessesIndex] = colors;
  }
}
