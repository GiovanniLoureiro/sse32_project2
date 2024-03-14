function replaceTextOnPage() {
    const operatorElements = document.querySelectorAll('.cm-operator');

    operatorElements.forEach(operator => {
        // Handle '**' replacement
        if (operator.textContent === '**' && operator.previousElementSibling && operator.nextElementSibling) {
            const prevElement = operator.previousElementSibling;
            const nextElement = operator.nextElementSibling;
            if (prevElement.classList.contains('cm-variable')) {
                const greenCodeText = document.createElement('span');
                greenCodeText.textContent = `GreenCode: * chains ${prevElement.textContent}*${prevElement.textContent}*... are faster than using **`;
                greenCodeText.style.color = 'black';
                greenCodeText.style.backgroundColor = 'lightgreen';
                greenCodeText.style.padding = '2px 4px';
                greenCodeText.style.borderRadius = '4px';
                prevElement.parentNode.insertBefore(greenCodeText, prevElement);
                prevElement.remove();
                operator.remove();
                nextElement.remove();
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
        // Handle 'for' loop replacement
        // TODO: replace 'for' loop with GreenCode suggest
        // Handle comparison type replacement
        // TODO: replace 'comparison' loop with GreenCode suggest about comparing different types
    });
}

window.onload = replaceTextOnPage;
