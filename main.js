import { draw_chart as draw_proportions_chart } from "./proportionsChart.js";
import { draw_chart as draw_rankings_chart } from "./rankingsChart.js";

const API_URLS = {
  rankings:
    "https://l18a6ufie7.execute-api.us-east-1.amazonaws.com/default/ServerlessHuggingFaceStack-prankinghandler49721718-d12asYvVQOgT",
  proportions:
    "https://t4vp11xbth.execute-api.us-east-1.amazonaws.com/ServerlessHuggingFaceStack3-handlerE1533BD5-ESlkhSlhgvWL",
};

const submitButton = document.getElementById("submit");
const textbox = document.getElementById("textbox");
const inputTooShortAlert = document.getElementById("input-too-short");
const toolSelector = document.getElementById("tool-selector");
const toolInfo = document.getElementById("tool-info");
let resultChart = null;

const fetch_API = (text, tool) => {
  const URL = API_URLS[tool];
  // console.log(tool, URL);
  fetch(URL, {
    method: "POST",
    body: text,
  })
    .then((data) => data.blob())
    .then((data) => data.text())
    .then((data) => {
      const table = JSON.parse(data);
      if (tool == "rankings") {
        resultChart = draw_rankings_chart(table, resultChart);
      }
      if (tool == "proportions") {
        resultChart = draw_proportions_chart(table, resultChart);
      }
      submitButton.disabled = false;
    });
};

submitButton.onclick = () => {
  if (textbox.value.length == 0) {
    inputTooShortAlert.hidden = false;
    return;
  }

  submitButton.disabled = true;
  fetch_API(textbox.value, toolSelector.value);
};

textbox.oninput = () => {
  if (textbox.value.length > 0) {
    inputTooShortAlert.hidden = true;
  }
};

toolSelector.onchange = () => {
  [...toolInfo.children].forEach((child) => {
    if (toolSelector.value == child.id) {
      child.hidden = false;
    } else {
      child.hidden = true;
    }
  });
};
