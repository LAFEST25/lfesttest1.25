  const tvScreen = document.getElementById('tv-screen');
  const screenOff = document.getElementById('screen-off');


  let isOn = false;

  const rules = [
    "1. ﻿﻿﻿Each team must have a minimum of five members, and a maximum of ten <br> 2. ﻿﻿﻿Teams will have three minutes for stage setup and seven minutes for performance. <br> 3. ﻿﻿﻿Each team must include at least three instruments and no more than four vocalists. <br> 4. ﻿﻿﻿All genres of music are permitted, except devotional, patriotic, and classical. <br> 5. ﻿﻿﻿Instruments must be tuned before the performance. <br> 6. ﻿﻿﻿The use of pre-recorded MIDI files, rhythm boxes, karaoke tracks, or drum pads is strictly prohibited. <br> 7. ﻿﻿﻿Shoulder synthesisers and USB-MIDI controllers are allowed, as long as they do not include pre-recorded MIDI loops. <br>8. ﻿﻿﻿The venue will provide the following: <br>* ﻿﻿A standard drum kit <br>* ﻿﻿Two keyboard stands <br> * ﻿Five microphones <br>* ﻿﻿Six output connections <br>9. ﻿﻿﻿Participants must bring any additional instruments and accessories they may need, such as guitar pedals, cables and drumsticks. <br> 10. ﻿﻿﻿﻿Amplifiers will be available upon request.",
    "Rule 2: Use max 3 team members.",
    "Rule 3: Bring your own gadgets.",
    "Rule 4: Solve the mystery to win.",
    "Rule 5: Time limit is 1 hour.",
    "Rule 6: Plagiarism = disqualified.",
    "Rule 7: Judges' decision is final."
  ];

  // New array to hold event names for renaming
  const eventNames = [
    "ENQUESTA",
    "",
    "",
    "",
    "",
    "",
    ""
  ];

  let currentRuleIndex = null;

  function togglePower() {
    isOn = !isOn;
    if (isOn) {
      loadEventBoxes();
      addSwipeListeners();
    } else {
      tvScreen.innerHTML = '<div class="screen-off" id="screen-off">TV OFF</div>';
      removeSwipeListeners();
    }
  }

  function loadEventBoxes() {
    currentRuleIndex = null;
    tvScreen.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'event-grid';

    // Insert placeholder div before first event box to center first row (2 items)
    const placeholderStart = document.createElement('div');
    placeholderStart.className = 'event-box-placeholder';
    grid.appendChild(placeholderStart);

    // Add first 2 event boxes (index 0,1)
    for (let i = 0; i < 2 && i < rules.length; i++) {
      const box = document.createElement('div');
      box.className = `event-box event-box-${i + 1} dm-serif-display-regular`;
      box.innerText = eventNames[i] || `Event ${i + 1}`;
      box.onclick = () => showRule(i);
      grid.appendChild(box);
    }

    // Add next 3 event boxes (index 2,3,4)
    for (let i = 2; i < 5 && i < rules.length; i++) {
      const box = document.createElement('div');
      box.className = `event-box event-box-${i + 1} dm-serif-display-regular`;
      box.innerText = eventNames[i] || `Event ${i + 1}`;
      box.onclick = () => showRule(i);
      grid.appendChild(box);
    }

    // Add last 2 event boxes (index 5,6)
    for (let i = 5; i < 7 && i < rules.length; i++) {
      const box = document.createElement('div');
      box.className = `event-box event-box-${i + 1} dm-serif-display-regular`;
      box.innerText = eventNames[i] || `Event ${i + 1}`;
      box.onclick = () => showRule(i);
      grid.appendChild(box);
    }

    // Insert placeholder div after last event box to center last row (2 items)
    const placeholderEnd = document.createElement('div');
    placeholderEnd.className = 'event-box-placeholder';
    grid.appendChild(placeholderEnd);

    tvScreen.appendChild(grid);
  }

  function showRule(index) {
    if (index < 0 || index >= rules.length) {
      return; // Out of bounds, do nothing
    }
    currentRuleIndex = index;
    const rule = rules[index];
    const view = document.createElement('div');
    view.className = 'rule-view dm-serif-display-regular';
    view.innerHTML = `<h2>${eventNames[index] || `Event ${index + 1}`} Rules</h2><p>${rule}</p>`;
    tvScreen.innerHTML = '';
    tvScreen.appendChild(view);
  }

  function goHome() {
    if (isOn) loadEventBoxes();
  }

  let touchStartX = null;
  let touchStartY = null;

  function handleTouchStart(event) {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }

  function handleTouchEnd(event) {
    if (touchStartX === null || touchStartY === null) {
      return;
    }
    const touch = event.changedTouches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Check if horizontal swipe is greater than vertical swipe and threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      if (diffX > 0) {
        // Swipe right - show next card
        if (currentRuleIndex !== null) {
          showRule(currentRuleIndex + 1);
        }
      } else {
        // Swipe left - show previous card
        if (currentRuleIndex !== null) {
          showRule(currentRuleIndex - 1);
        }
      }
    }

    touchStartX = null;
    touchStartY = null;
  }

  function addSwipeListeners() {
    tvScreen.addEventListener('touchstart', handleTouchStart, false);
    tvScreen.addEventListener('touchend', handleTouchEnd, false);
  }

  function removeSwipeListeners() {
    tvScreen.removeEventListener('touchstart', handleTouchStart, false);
    tvScreen.removeEventListener('touchend', handleTouchEnd, false);
  }
