import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const bubbleHover = document.getElementById("bubble-hover");
    const phrase = bubbleHover.innerText;

    bubbleHover.innerText = "";

    phrase.split("").map((char, index) => {
      const span = document.createElement("span");

      span.innerText = char;
      span.setAttribute("data-index", index.toString());
      span.classList.add("hover-char");

      bubbleHover.appendChild(span);
      return null;
    });

    const hoverChars = [...document.getElementsByClassName("hover-char")];

    const removeClasses = () => {
      hoverChars.map((char) => {
        char.classList.remove("hovered");
        char.classList.remove("hovered-adjacent");
        return null;
      });
    };

    hoverChars.map((char) => {
      char.addEventListener("mouseover", (element) => {
        removeClasses();

        const currentElement = element.target;
        const index = parseInt(currentElement.getAttribute("data-index"), 10);
        const prevIndex = index === 0 ? null : index - 1;
        const nextIndex = index === phrase.length - 1 ? null : index + 1;
        const prevElement = prevIndex !== null && document.querySelector(`[data-index="${prevIndex}"]`);
        const nextElement = nextIndex !== null && document.querySelector(`[data-index="${nextIndex}"]`);

        currentElement.classList.add("hovered");
        prevElement && prevElement.classList.add("hovered-adjacent");
        nextElement && nextElement.classList.add("hovered-adjacent");
      });

      return null;
    });

    document.getElementById("bubble-hover").addEventListener("mouseleave", () => {
      removeClasses();
    });
  });

  return (
    <div className="App">
      <h1 id="bubble-hover">Ryan Aristosa</h1>
    </div>
  );
}

export default App;
