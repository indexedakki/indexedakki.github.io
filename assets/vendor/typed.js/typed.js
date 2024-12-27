// Function to type text
function typeText(element, text, index, interval, callback) {
    if (index < text.length) {
      element.textContent = text.substring(0, index + 1);
      setTimeout(() => {
        typeText(element, text, index + 1, interval, callback);
      }, interval);
    } else {
      callback(); // Call the callback function when typing is complete
    }
  }
  
  // Function to delete text
  function deleteText(element, text, interval, callback) {
    let i = text.length;
    const deleteInterval = setInterval(() => {
      element.textContent = text.slice(0, --i);
      if (i === 0) {
        clearInterval(deleteInterval);
        callback(); // Call the callback function when deletion is complete
      }
    }, interval);
  }
  
  // Main function to handle the typing sequence
  function typingSequence(typingElement, texts, index) {
    const currentText = texts[index];
    
    // Type the current text
    typeText(typingElement, currentText, 0, 50, () => {
      // Wait for 2 seconds after typing completes
      setTimeout(() => {
        // Delete the typed text
        deleteText(typingElement, currentText, 30, () => {
          // Move to the next text in the sequence
          let nextIndex = (index + 1) % texts.length;
          
          // Recursively call typingSequence with the next text
          typingSequence(typingElement, texts, nextIndex);
        });
      }, 2000); // 2000 milliseconds = 2 seconds
    });
  }
  
  // Initialize the typing sequence
  document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-text');
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    typingElement.appendChild(cursor);
  
    // Array of texts to type
    const textsToType = ['Pythonist', 'Developer', 'Problem Solver'];
  
    // Start the typing sequence
    typingSequence(typingElement, textsToType, 0);
  });
  