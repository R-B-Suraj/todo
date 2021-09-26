// we again use  bootstrap  for styling...
// for trashcan icon.. fontAwsome



//  when we add another element it doesn't reload the page. instead appens it

const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
// input field inside search class form



// reusable code... crete a function to generate the list element
const generateTemplate = todo =>{
    // we could create element using javascript methods... but we'll use template string
    const html = `
    <li class="fa_custom list-group-item d-flex justify-content-between align-items-center">
                <span>${todo}</span>
                <i class="fa fa-trash-o fa_custom delete"></i>
    </li>

    `;
    // now we need to inject it to ul..

    list.innerHTML += html;

};






addForm.addEventListener('submit',e =>{
    e.preventDefault();

    // const todo = addForm.add.value;
    // // we don't want to store the spaces  earlier or later by accident.  add is the name of the input element
    const todo = addForm.add.value.trim();
    // removes white spaces from edge

    console.log(todo);

    // we don't want to add when enter is pressed unless something is typed 
    if(todo.length){
        generateTemplate(todo);
        // addForm.reset();  // resets all the input fields inside the form
        addForm.add.value ="";
    }
     // and also we should clear the all input field after adding


});




// deleting  todos ... Event delegation   event bubbling

list.addEventListener('click',e =>{

// check whether the clicked region is a trash can ...  class = delete
if(e.target.classList.contains('delete')){
    // checks whether it contains the delete class
    // remember .includes()  was for array.. classList is not array of objects

    e.target.parentElement.remove();
    // li tag containing the trash can removed...

}


});








// searching  todo  and filtering


// list is the ul  containing todos which are li elements children of ul
// but children is a HTML collection... we can't use array methods directly
// we have to first convert it into array... 

const filterTodos = (term)=>{
    // console.log(Array.from(list.children));
    // open the console.. open prototype attribute.. there see which functions we can use

    Array.from(list.children)
        .filter((todo)=>{
            // todo is each li tag
            // console.log(todo.textContent)
            // filtered 
            return !todo.textContent.includes(term);
            // we want to keep the ones who don't match and hide them


        })
        .forEach((todo)=>{
            todo.classList.add('filtered_out');
        });
        //  above we hide the strings which don't match...
        // but there is a problem here...  keyup event occurs whenever we type a new letter..
        // if we go back.. now some of the elements already hidden should show up..
        // eg.  assume total  todos..  A,B,C,D,E,F
        // type    ma    A,B,D,E  show up    C,F are marked hidden
        // type    mar   A,B  show up        now D,E are marked hidden...too
        // type backspace  ie..again      ma     now A,B show up
        // because   D,E are already marked  hidden... even though we now mark  C,F as hidden again... 
        // still we didn't mark  D,E as unhidden.....   
        // so for every search string ... we also should remove the hidden mark from those who matches...
        // may be they were already marked hidden in another search string

    Array.from(list.children)
        .filter(todo=> todo.textContent.includes(term))
        .forEach(todo => todo.classList.remove('filtered_out'))



};

//  there are other methods to do above.. the reason we used filter  because
//  we were discussing array methods as of now  so we used it here...





// to make case insensitive... convert them all to lower or upper case

search.addEventListener('keyup' , ()=>{

    const term = search.value.trim();

    
    if(term.length){
        filterTodos(term);
    }

});