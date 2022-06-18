/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const itemsPerPage = 9;
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   studentList.innerHTML = '';
   // Creates element with student info through array iteration and dynamically inserts the HMTL
   list.forEach( student => {
      if (list.indexOf(student) >= startIndex && list.indexOf(student) < endIndex) {
         const studentHTML = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
                  <h3>${student.name.first} ${student.name.last}</h3>
                  <span class="email">${student.email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${student.registered.date}</span>
               </div>
            </li>
         `;
      studentList.insertAdjacentHTML("beforeend", studentHTML);
      }
   });
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   const totalPages = Math.ceil(list.length / itemsPerPage);
   linkList.innerHTML = '';
   for (let i = 1; i <= totalPages; i++) {
      const pageLinkHTML = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      linkList.insertAdjacentHTML("beforeend", pageLinkHTML);
   }
   linkList.firstElementChild.firstElementChild.className = "active";

   // Page link button functionality
   linkList.addEventListener( "click", (e) => {
      const button = e.target;
      if (button.tagName === "BUTTON") {
         linkList.querySelector('.active').className = "";
         e.target.className = "active";
         showPage(data, e.target.textContent);
      }
   });
}

/*
Searchbar function
this function will create an active searchbar to filter through the students that match search criteria
*/

function addSearchbar() {
   const header = document.querySelector('.header');
   const searchbarHTML = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;
   header.insertAdjacentHTML('beforeend', searchbarHTML);
}



// Call functions

showPage(data, 1);
addPagination(data);
addSearchbar();


/*
Search Filter funciton
filters the array of students to show only the results that match the value in the searchbar
*/

function search(list) {
   const searchbar = document.querySelector('#search');
   searchbar.addEventListener('keyup', () => {
      let input = searchbar.value.toLowerCase();
      let filteredResults = [];
      list.forEach( student => {
         const fullName = [student.name.first, student.name.last].join(' ');
         if (fullName.toLowerCase().includes(input)) {
            filteredResults.push(student);
         }
      });
      if (filteredResults.length === 0) {
         studentList.innerHTML = `<li class="no-results">No Results</li>`;
         linkList.innerHTML = '';
      } else {
         showPage(filteredResults, 1);
         addPagination(filteredResults);
      }
   });
}

search(data);