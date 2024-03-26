function replaceTextOnPage() {
    const operatorElements = document.querySelectorAll('.cm-operator');

    operatorElements.forEach(operator => {
        if (operator.textContent === '**') {
            console.log("found a **")
            // Attempt to find the parent element that represents the whole line of code
            let lineElement = operator.parentElement;
            // Ensure that we only select the parent element if it contains only one line of code
            // This check depends on the structure of your code editor's markup
            if (lineElement) {
                const greenCodeText = document.createElement('span');
                greenCodeText.textContent = "GreenCode: using * is faster than using **";
                greenCodeText.style.color = 'black';
                greenCodeText.style.backgroundColor = 'lightgreen';
                greenCodeText.style.padding = '2px 4px';
                greenCodeText.style.borderRadius = '4px';
                greenCodeText.style.display = 'block'; // Ensure it takes up the full line

                // Replace the entire line with the GreenCode message
                if (lineElement.parentNode !== null) {
                    lineElement.parentNode.replaceChild(greenCodeText, lineElement);
                }
            }
        }
        // Handle '+' replacement
        else if (operator.textContent === '+' && operator.previousElementSibling && operator.nextElementSibling) {
            let chainStart = operator.previousElementSibling;
            let chainEnd = operator.nextElementSibling;

            // Verify if chainStart is part of a concatenation chain
            if (!chainStart.classList.contains('cm-variable') && !chainStart.classList.contains('cm-string')) {
                return; // Not a valid start, exit current iteration
            }

            // Look backwards to find the start of the chain
            while (chainStart.previousElementSibling && chainStart.previousElementSibling.textContent === '+' &&
            (chainStart.previousElementSibling.previousElementSibling.classList.contains('cm-variable') || chainStart.previousElementSibling.previousElementSibling.classList.contains('cm-string'))) {
                chainStart = chainStart.previousElementSibling.previousElementSibling;
            }

            // Look forwards to confirm the end of the chain
            while (chainEnd.nextElementSibling && chainEnd.nextElementSibling.textContent === '+' &&
            (chainEnd.nextElementSibling.nextElementSibling.classList.contains('cm-variable') || chainEnd.nextElementSibling.nextElementSibling.classList.contains('cm-string'))) {
                chainEnd = chainEnd.nextElementSibling.nextElementSibling;
            }

            // Replace the chain with GreenCode message
            const greenCodeText = document.createElement('span');
            greenCodeText.textContent = "GreenCode: use join([stringlist]) to join strings";
            greenCodeText.style.color = 'black';
            greenCodeText.style.backgroundColor = 'lightgreen';
            greenCodeText.style.padding = '2px 4px';
            greenCodeText.style.borderRadius = '4px';
            chainStart.parentNode.insertBefore(greenCodeText, chainStart);

            // Collect all elements in the chain to be removed
            let elementsToRemove = [];
            let currentElement = chainStart;

            while (true) {
                elementsToRemove.push(currentElement); // Add the current variable/string element to the list
                if (currentElement === chainEnd) {
                    break; // Exit the loop if we've reached the end of the chain
                }
                currentElement = currentElement.nextElementSibling.nextElementSibling; // Move to the next variable/string in the chain
            }

            // Additionally, collect '+' operators to remove
            currentElement = chainStart.nextElementSibling;
            while (currentElement !== chainEnd) {
                if (currentElement.textContent === '+') {
                    elementsToRemove.push(currentElement); // Add '+' operator to the list
                }
                currentElement = currentElement.nextElementSibling; // Move to the next element
            }

            // Now, remove all collected elements
            elementsToRemove.forEach(el => el.remove());
        }
        // Handle '<' replacement
        else if (operator.textContent === '<' || operator.textContent === '>' || operator.textContent === '==') {
            // Attempt to find the parent element that represents the whole line of code
            let lineElement = operator.parentElement;
            // Ensure that we only select the parent element if it contains only one line of code
            // This check depends on the structure of your code editor's markup
            if (lineElement &&
                (lineElement.textContent.includes('<') ||
                    lineElement.textContent.includes('>') ||
                    lineElement.textContent.includes('=='))) {
                const greenCodeText = document.createElement('span');
                greenCodeText.textContent = "GreenCode: Ensure that only variables of the same type are compared";
                greenCodeText.style.color = 'black';
                greenCodeText.style.backgroundColor = 'lightgreen';
                greenCodeText.style.padding = '2px 4px';
                greenCodeText.style.borderRadius = '4px';
                greenCodeText.style.display = 'block'; // Ensure it takes up the full line

                // Replace the entire line with the GreenCode message
                if (lineElement.parentNode !== null) {
                    lineElement.parentNode.replaceChild(greenCodeText, lineElement);
                }

            }
        }
    });

    const keywordElements = document.querySelectorAll('.cm-keyword');

    keywordElements.forEach(keyword => {
        if (keyword.textContent === 'for') {
            console.log("found a for")
            // Attempt to find the parent element that represents the whole line of code
            let lineElement = keyword.parentElement;
            // Ensure that we only select the parent element if it contains only one line of code
            // This check depends on the structure of your code editor's markup
            if (lineElement && lineElement.textContent.includes('for')) {
                const greenCodeText = document.createElement('span');
                greenCodeText.textContent = "GreenCode: Consider using array methods like .map, etc., instead of 'for' loops";
                greenCodeText.style.color = 'black';
                greenCodeText.style.backgroundColor = 'lightgreen';
                greenCodeText.style.padding = '2px 4px';
                greenCodeText.style.borderRadius = '4px';
                greenCodeText.style.display = 'block'; // Ensure it takes up the full line

                // Replace the entire line with the GreenCode message
                if (lineElement.parentNode !== null) {
                    lineElement.parentNode.replaceChild(greenCodeText, lineElement);
                }
            }
        }
    });
}

window.onload = replaceTextOnPage;
