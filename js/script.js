
const containerCell = document.querySelector('._container_cell');
const btnStart = document.querySelector('.btn_start');
const btnClicked = document.querySelector('._clicked');
const difficultSelect = document.querySelector('.difficult_select');


const nCellArray = [100, 81, 49];



// al click di btnStart....
btnStart.addEventListener('click', function(){

   reset();

   const nCell = nCellArray[difficultSelect.value];


   // creazione delle Cell
   for( let i = 1; i <= nCell; i++){
      // invoco la funzione per creare le Cell
      const cell = createCell(i, nCell);
   
      containerCell.append(cell);   
   }
})




/////////// FUNCTIONS ///////////////

// funzione che crea le Cell
function createCell(indice, numberCell){

   // creo sull'HTML un 'div' e gli metto la Class '_cell'
   const element = document.createElement('div');
   element.classList.add('_cell');


   // condizione per sapere quale grado di difficoltà inserire in element
   let x = '';

   if(numberCell === 100){
      x = '_easy';
   }
   else if(numberCell === 81){
      x = '_medium';
   }
   else{
      x = '_hard';
   }
   element.classList.add(x);


   // creazione di una proprietà custom dell'HTML
   element._numIndice = indice;


   // al click di 'element'....
   element.addEventListener('click', function(){

      // scrivi dentro 'element' il numero dell'indice e aggiungi ad element la Class '_bgcell'
      element.innerHTML= element._numIndice;
      element.classList.add('_bgcell')
   })

   return element
}
      



















// funzione di reset
function reset(){
   containerCell.innerHTML = '';
}
 
   





