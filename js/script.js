
const containerCell = document.querySelector('._container_cell');
const btnStart = document.querySelector('.btn_start');
const btnClicked = document.querySelector('._clicked');
const difficultSelect = document.querySelector('.difficult_select');


const nCellArray = [100, 81, 49];

const bombsArray = [];




// al click di btnStart....
btnStart.addEventListener('click', function(){

   // invoco la funzione reset
   reset();

 

   // con il valore della difficoltà da 0 a 2 valorizzo un numero dentro un Array
   const nCell = nCellArray[difficultSelect.value];


   // invoco la funzione per creare le bombe
   const bombs = createBombs(nCell);
   
   console.log('bombe totali in gioco -----------',bombs)





   // creazione delle Cell
   for( let i = 1; i <= nCell; i++){
      // invoco la funzione per creare le Cell
      const cell = createCell(i, nCell);
   
      containerCell.append(cell);   
   }

})




/////////// FUNCTIONS ///////////////

// funzione che crea le Cell
function createCell(indice, nCell){

   // creo sull'HTML un 'div' e gli metto la Class '_cell'
   const element = document.createElement('div');
   element.classList.add('_cell');


   // invoco la funzione per sapere quale classe dare ad 'element'
   element.classList.add(cssClassEasyMediumHard(nCell));


   // creazione di una proprietà custom dell'HTML
   element._numIndice = indice;


   // al click di 'element'....
   element.addEventListener('click', function(){

      // scrivi dentro 'element' il numero dell'indice e aggiungi ad element la Class '_bgcell'
      element.innerHTML= element._numIndice;
      element.classList.add('_bgcell');
   })

   return element;
}
      



// funzione per creare le bombe
function createBombs(celle){

   let i = 0; 

   while(i <= 10){
        
      nBombs = Math.ceil(Math.random() * celle); 

      console.log('nbomba', nBombs);

      bombsArray.push(nBombs);

      console.log('Array bombe', bombsArray);

      i++;
   }

   return bombsArray;
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
}
 
   





