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
      requestData();
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
      // studentObj.id = null;
      studentObj.name = studentName;
      studentObj.course_name = courseName;
      studentObj.grade = studentGrade;
      student_array.push(studentObj);
      console.log('addStudent function, Line 84: ', studentObj);
      console.log('addStudent function, Line 85: ', student_array);
      sendData(studentObj);
      // updateStudentList(student_array);
      // clearAddStudentFormInputs();
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
      var studentCourse = $('<td>').text(studentObj.course_name);
      var studentGrade = $('<td>').text(studentObj.grade);
      var deleteBtn = $('<button>', {
            // type: 'button',
            class: 'btn btn-danger',
            text: 'Delete'
      });
      (function(){
            deleteBtn.click(function(){
                  //removes object from student_array
                  let studentsData = requestData();
                  console.log('hello: ', studentsData);
                  let studentI = student_array.indexOf(studentObj);
                  
                  // console.log("student_array: ", student_array);
                  // console.log('line 118 studentI is: ', studentI);
                  // console.log('line 119 inside render > deleteBtn func studentObj: ', studentObj);
                  student_array.splice(studentI, 1);
                  // console.log('line 121 inside render > deleteBtn func studentObj: ', studentObj);
                  // console.log('line 122 studentI is: ', studentI);
                  
                  //removes from DOM
                  // console.log('THIS is inside deleteBtn function on line 120: ', event.currentTarget);
                  $((this.closest)('td')).remove();
                  // event.currentTarget.remove(parent);
                  updateStudentList(studentsData);
            });
      })()

      var tableRow = $('<tr>').attr('id', studentObj.id);
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
* requestData - requests student_array data from sgt database*/
function requestData() {

      var ajaxConfig = {
            data: {
                  action: 'readAll'
            },
            dataType: 'json',
            method: 'POST',
            url: 'http://localhost:8000/data.php',
            success: function(result) {
                  students = result.data;
                  console.log('request Data:', students);
                        updateStudentList(students);
                  
            }
      }
      $.ajax(ajaxConfig);
}
/***************************************************************************************************
* sendData - sends input info data to sgt database*/
function sendData(sendingData) {

      var ajaxConfig = {
            data: {
                  action: 'insert',
                  //key: sendingData.key,
                  name: sendingData.name,
                  course: sendingData.course_name,
                  grade: sendingData.grade
            },
            dataType: 'json',
            method: 'POST',
            url: 'http://localhost:8000/data.php',
            success: function(result) {
                  students = result.data;
                  console.log('sendData function Line 210: ', students);
                        updateStudentList(students);
            },
            error: function(result) {
                  console.log('sendData function error Line 214: ', result);
            }
      }
      $.ajax(ajaxConfig);
}

/***************************************************************************************************
* sendDeleteData - sends delete info data to sgt database*/
// function dbDeleteData(str){

function deleteData(deletingData) {

      var ajaxConfig = {
            data: {
                  action: 'delete',
                  id: deletingData.id,
            },
            dataType: 'json',
            method: 'POST',
            url: 'http://localhost:8000/data.php',
            success: function(result) {
                  students = result.data;
                  console.log('Success deleteData function Line 249: ', students);
                        updateStudentList(students);
            },
            error: function(result) {
                  console.log('Error deleteData function Line: ', result);
            }
      }
      $.ajax(ajaxConfig);
}
