/* source: https://www.quora.com/What-is-the-best-way-to-validate-for-a-URL-in-JavaScript
 */

function is_url(str) {
  regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}

const replaceCSS = url => {
  if (is_url(url)) {
    document.querySelectorAll('[rel="stylesheet"]')[2].href = url;
  }
};

const updateFromChangeDisplay = () => {
  if (document.getElementById("windowHeader").innerText == "Game Settings") {
    console.log("rendered");
    render();
  }
};

const render = () => {
  let setHolder = document.createElement("div");
  setHolder.classList.add("settName");
  setHolder.setAttribute("title", true);

  setHolder.innerText = "Custom CSS";

  let cssInput = document.createElement("input");
  cssInput.setAttribute("type", "url");
  cssInput.setAttribute("name", "url");
  cssInput.setAttribute("placeholder", "CSS URL");
  cssInput.classList.add("inputGrey2");

  cssInput.oninput = () => {
    replaceCSS(cssInput.value);
  };

  setHolder.appendChild(cssInput);
  document.getElementById("settHolder").appendChild(setHolder);
};

//checks when windowHolder cleared to re-render css element
const setDisplayInterval = () => {
  let int = setInterval(() => {
    if (document.getElementById("windowHolder").style.display == "block") {
      console.log(
        "Window holder being displayed, checking if game settings present"
      );
      updateFromChangeDisplay();
      clearInterval(int);

      let interval = setInterval(() => {
        if (document.getElementById("windowHolder").style.display == "none") {
          console.log("Window holder hidden, checking for display");
          clearInterval(interval);
          setDisplayInterval();
        }
      }, 10);
    }
  }, 10);
};

module.exports.init = () => {
  let checkInterval = setInterval(() => {
    if (document.contains(document.getElementById("settHolder"))) {
      setDisplayInterval();
      clearInterval(checkInterval);
    }
  }, 10);
};
