
// variabili Js collegate all'HTML
const containerCell = document.querySelector('._container_cell');
const btnStart = document.querySelector('.btn_start');
const btnClicked = document.querySelector('._clicked');
const difficultSelect = document.querySelector('.difficult_select');
const overlay = document.querySelector('._overlay');

// output string
const outputFinalScore = document.querySelector('._output_final_score');
const outputScore = document.querySelector('._output_score');


// array
const nCellArray = [100, 81, 49];
let bombsArray = [];
const elementBombArray = [];
const elementsArray = [];

let score = 0;



// al click di btnStart....
btnStart.addEventListener('click', function(){

   reset();

   // con il valore della difficoltà da 0 a 2 valorizzo un numero dentro un Array
   const nCell = nCellArray[difficultSelect.value];

   // invoco la funzione per creare le bombe nell'Array
   const bombsArray = [createBombs(nCell)]; 

   // creazione delle Cell
   for( let i = 1; i <= nCell; i++){
      // invoco la funzione per creare le Cell
      const cell = createCell(i, nCell, score);
   
      containerCell.append(cell);   
   }

})






///////////////////////// FUNCTIONS //////////////////////////


// funzione che crea le Cell
function createCell(indice, nCell){

   // creo sull'HTML un 'div' e gli metto la Class '_cell'
   const element = document.createElement('div');
   element.classList.add('_cell');

   // invoco la funzione per sapere quale classe dare ad 'element'
   element.classList.add(cssClassEasyMediumHard(nCell));

   // inserisco tutti gli element dentro un Array
   elementsArray.push(element);

   // creazione di una proprietà custom dell'HTML
   element._numIndice = indice;
   
   // se nell'array delle bombe è incluso il numero corrente...
   if(bombsArray.includes(element._numIndice)){

      element._numIndice = '';        // cancella il numero di '_numIndice'
      element._numBomb = 'bomba';        // crea una proprietà custom e scrivici 'bombA'
      elementBombArray.push(element);       // metti elemento bomba HTML dentro l''elementBombaArray'
   }



   // al click di 'element'....
   element.addEventListener('click', function(){

      // se la proprietà custom '_numBomb' ha scritto dentro di se 'bomba'...
      if(element._numBomb === 'bomba'){

         // invoco la funzione per far esplodere tutte le bombe
         explodeAllBombs(elementBombArray);
         outputFinalScore.innerHTML = `Hai Perso!`;
         overlay.classList.remove('d-none');
         return;
      }

      // aggiungi ad 'element' la Class '_bgcell'
      element.classList.add('_bgcell');

      // invoco la funzione per sapere quante caselle sono state cliccate e aggiornare il counter
      isClicked(element, nCell, score, elementsArray, bombsArray);

   })

   return element;
}
      




//  funzione che mi comunica se una cella è gia stata cliccata o no, con incremento di counter
function isClicked(element, nCell, punteggio, elementsArray){
   element.classList.add('_clicked');

   // controlla con un ciclo quante classi '_clicked' sono state assegnate, e il numero sarà il counter
   for(let i = 0; i < elementsArray.length; i++){
      if(elementsArray[i].classList.contains('_clicked')){
         punteggio++;
      }
   }

    if(punteggio === (nCell - 16)){
       outputFinalScore.innerHTML = `Hai Vinto!`;
    }
    outputScore.innerHTML = `Hai fatto ${punteggio} punti su ${nCell}`;
}





// funzione per creare le bombe
function createBombs(celle){

   // cicla affinchè gli elementi dell'Array sono meno di 16
   while(bombsArray.length < 16){
      const number = Math.ceil(Math.random() * celle); 

      // se il numero estratto non è compreso nell'Array inseriscilo
      if(!bombsArray.includes(number)){
         bombsArray.push(number);
      }
   }
   return bombsArray; 
}



// funzione che fa esplodere tutte le bombe
function explodeAllBombs(elementBombArray){

   // aggiungi a tutti gli elementi bomba dell'Array la classe 'bg-danger'
   for(let i = 0; i < elementBombArray.length; i++){
      elementBombArray[i].classList.add('bg-danger');
   }
}




// funzione che stabilisce quale classe css inserire in 'element'
function cssClassEasyMediumHard(confronto){

   let x = '';

   if(confronto === 100){
      x = '_easy';
   }
   else if(confronto === 81){
      x = '_medium';
   }
   else{
      x = '_hard';
   }
   return x;
}




// funzione di reset
function reset(){
   containerCell.innerHTML = '';
   bombsArray = [];
   overlay.classList.add('d-none');

   outputScore.innerHTML = '';
   outputFinalScore.innerHTML = '';
}