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
      $('.btn-info').click(requestData);
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
      //debugger;
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
                  //removes object from student_array
                  var studentI = student_array.indexOf(studentObj)
                  student_array.splice(studentI, 1);
                  
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
      //debugger;
      //clear the entire table 
      $('tbody').empty();
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
      var result = 0;
      for (var i = 0; i < students.length; i++) {
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
/***************************************************************************************************
* requestData - requests student_array data from lfz database*/
function requestData() {

      var ajaxConfig = {
            data: {
                  api_key: '34Ry8P0JAo'
            },
            dataType: 'json',
            method: 'POST',
            url: 'http://s-apis.learningfuze.com/sgt/get',
            success: function(result) {
                  students = result.data;
                  console.log(students);
                        updateStudentList(students);
                  
            }
      }
      $.ajax(ajaxConfig);
}
