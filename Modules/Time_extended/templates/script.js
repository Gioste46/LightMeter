const CurrentDateElement = document.getElementById('day');
const body = document.getElementById('background');

// Initialize variables
let previousTime = ''; // Store previous time to detect changes
let hasHappen = false; // Flag to determine if the time update has occurred
let hoursElement, minutesElement; // Variables to store the hours and minutes elements

// Function to start the clock and update time and date continuously
async function startClock() {
   while (true) {
      // Get current date and time
      const date = new Date();
      const hours = date.getHours();
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert to 12-hour format
      const minutes = date.getMinutes();
      const formattedMinutes = minutes < 10 ? '0' + minutes : '' + minutes; // Add leading zero if needed

      // Construct formatted time and determine meridian
      const formattedTime = formattedHours + ':' + formattedMinutes;
      const Meridian = hours >= 12 ? 'PM' : 'AM';

      // Prepare time arrays for comparison
      const currentTimeArray = [formattedHours, formattedMinutes];
      const timeArray = formattedTime.split(':');

      // Check if time has changed or it's the first update
      if (!arraysEqual(currentTimeArray, timeArray) || !hasHappen) {
         // If it's the first update or elements have changed, create or update time display
         if (!document.getElementById('TimeWrapper')) {
            createInitialTimeDisplay();
         } else {
            updateHoursAndMeridian(timeArray[0], Meridian);
            updateMinutes(timeArray[1]);
         }

         // Update previous time and set flag
         previousTime = formattedTime;
         hasHappen = true;
      }

      // Update the date display
      updateDate();

      await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust the interval as needed
   }
}

// Function to create initial time display
function createInitialTimeDisplay() {
   const TimeWrapper = document.createElement('div');
   TimeWrapper.setAttribute('id', 'TimeWrapper');
   body.appendChild(TimeWrapper);

   const InnerWrapper = document.createElement('div');
   InnerWrapper.setAttribute('id', 'InnerWrapper');
   TimeWrapper.appendChild(InnerWrapper);

   const TimeAMPM = document.createElement('p');
   TimeAMPM.setAttribute('id', 'TimeAMPM');
   TimeWrapper.appendChild(TimeAMPM);

   // Create hours element
   hoursElement = document.createElement('p');
   InnerWrapper.appendChild(hoursElement);

   // Create colon element
   const colonElement = document.createElement('p');
   colonElement.innerHTML = ':';
   InnerWrapper.appendChild(colonElement);

   // Create minutes element
   minutesElement = document.createElement('p');
   InnerWrapper.appendChild(minutesElement);
}

// Function to update hours and meridian
function updateHoursAndMeridian(hours, meridian) {
   if (hoursElement) {
      if (hoursElement.innerHTML !== hours) {
         animateDigit(hoursElement, hours);
      }
   }

   const TimeAMPM = document.getElementById('TimeAMPM');
   if (TimeAMPM) {
      TimeAMPM.innerHTML = meridian;
   }
}

// Function to update minutes
function updateMinutes(minutes) {
   if (minutesElement) {
      if (minutesElement.innerHTML !== minutes) {
         animateDigit(minutesElement, minutes);
      }
   }
}

// Function to animate digit changes
function animateDigit(element, newValue) {
   const oldValue = element.innerHTML;

   // Apply slide-out animation
   element.classList.add('slide-out-blurred-bottom');

   // Remove slide-out animation and update the element after a delay
   setTimeout(() => {
      element.classList.remove('slide-out-blurred-bottom');
      // Update the element with the new value
      element.innerHTML = newValue;
      // Apply slide-in animation
      element.classList.add('slide-in-blurred-top');
      // Remove slide-in animation after a delay
      setTimeout(() => {
         element.classList.remove('slide-in-blurred-top');
      }, 500); // Adjust this timeout to match your animation duration
   }, 500); // Adjust this timeout to match your animation duration
}

// Function to update the date
function updateDate() {
   const currentDate = new Date();
   const day = currentDate.toLocaleDateString('en-US', { day: '2-digit' });
   const longDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
   const month = currentDate.toLocaleDateString('en-US', { month: '2-digit' });
   const formattedDate = day + '/' + month;

   // Update the date display
   document.getElementById('name').innerHTML = longDay;
   CurrentDateElement.innerHTML = formattedDate;
}

// Function to check if arrays are equal
function arraysEqual(arr1, arr2) {
   if (arr1.length !== arr2.length) return false;
   for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
   }
   return true;
}

// Start the clock
startClock();
