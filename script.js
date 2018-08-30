/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 * 
 */
student_array = [];
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */


/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
      addClickHandlersToElements();
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
      $('.btn-success').on('click', handleAddClicked);
      $('.btn-default').on('click', handleCancelClick);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: none
 */
function handleAddClicked(){
      addStudent();

}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
      clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */

function addStudent(){
      var courseName = $('#course').val();
      var studentName = $('#studentName').val();
      var studentGrade = $('#studentGrade').val();

      var studentObj = {};
      studentObj.key = 
      studentObj.name = studentName;
      studentObj.course = courseName;
      studentObj.grade = studentGrade;
      student_array.push(studentObj);
      // console.log('inside addStudent: ', student_array);
      // console.log('inside addStudent: ', studentGrade);

      //renderStudentOnDom(studentObj);
      updateStudentList(student_array);
      clearAddStudentFormInputs();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
      $('#course').val('');
      $('#studentName').val('');
      $('#studentGrade').val('');
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(studentObj){
      // console.log('inside render1: ', studentObj);
      //console.log('inside render2: ', studentObj.name);
      // var studName = $('<tr>').studentObj.name;
      // $('.student_list tbody').append(studName);
      //var tR = $('<tr>');

      var studentName = $('<td>').text(studentObj.name);
      var studentCourse = $('<td>').text(studentObj.course);
      var studentGrade = $('<td>').text(studentObj.grade);
      var deleteBtn = $('<button>', {
            type: 'button',
            class: 'btn btn-danger',
            text: 'Delete'
      });
      (function(){
            deleteBtn.click(function(){
                  //debugger;

                  //removes object from student_array
                  // student_array.indexOf(studentarrayindex)
                  // studentarray.splice(studentarrayindex, 1)
                  console.log('student array: ', student_array);
                  console.log('student object: ', studentObj);
                  var studentI = student_array.indexOf(studentObj)
                  student_array.splice(studentI, 1);
                  console.log('student array after spice: ', student_array);
                  // if(studentObj === studentObj) {
                  //       console.log('studentObj is true');
                  // } else {
                  //       console.log('studentObj is false');
                  // }
                  // console.log(this);
                  //removes from DOM
                  $((this.closest)('tr')).remove();
                  updateStudentList(student_array);
            });
      })()

      var tableRow = $('<tr>');
      $(tableRow).append(studentName, studentCourse, studentGrade, deleteBtn);
      $('tbody').append(tableRow);

}


/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(students) {
      //clear the entire table 
      $('tbody').empty();
      //console.log('inside updateList: ', students);
      for (var studentArrIndex = 0; studentArrIndex < students.length; studentArrIndex++) {

            renderStudentOnDom(students[studentArrIndex]);
      }            
      var avgGrade = calculateGradeAverage(students);
      renderGradeAverage(avgGrade);
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(students){
      //console.log(students);
      //debugger;
      var result = 0;
      for (var i = 0; i < students.length; i++) {
            //var eachGrade = $('tbody tr td:nth-child(3)').text();
            var eachGrade = parseInt(students[i].grade);
            result += eachGrade;
            
      }
      var gradeAvg = Math.round(result / students.length);
      return gradeAvg;

}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(averageGrade){
      $('.avgGrade').text(averageGrade);
}





