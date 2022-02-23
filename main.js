const API_URL =
  "https://t4vp11xbth.execute-api.us-east-1.amazonaws.com/ServerlessHuggingFaceStack3-handlerE1533BD5-ESlkhSlhgvWL";

const submitButton = document.getElementById("submit");
const textbox = document.getElementById("textbox");
const inputTooShortAlert = document.getElementById("input-too-short");
let resultChart = null;

const process_table = (table) => {
  const labels = table.map((item) => `Layer ${item[0]}`);
  const values = table.map((item) => item[1]);
  return {
    labels,
    values,
  };
};

const get_chart_data = (labels, values) => {
  return {
    labels: labels,
    datasets: [
      {
        label: "Fraction of the time neurons are activated",
        backgroundColor: "rgb(50, 50, 200)",
        borderColor: "rgb(25, 25, 100)",
        data: values,
      },
    ],
  };
};

const get_chart_config = (data) => {
  return {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
};

const draw_new_chart = (labels, values) => {
  const data = get_chart_data(labels, values);
  const config = get_chart_config(data);
  resultChart = new Chart(document.getElementById("result-chart"), config);
};

const draw_chart = (table) => {
  const { labels, values } = process_table(table);
  if (resultChart) {
    resultChart.config.data.labels = labels;
    resultChart.config.data.datasets[0].data = values;
    resultChart.update();
  } else {
    draw_new_chart(labels, values);
  }
};

const fetch_API = (text) => {
  console.log(text);
  fetch(API_URL, {
    method: "POST",
    body: text,
    // mode: "cors",
    // cache: "default",
  })
    .then((data) => data.blob())
    .then((data) => data.text())
    .then((data) => {
      table = JSON.parse(data);
      draw_chart(table);
      console.log("data received!");
      submitButton.disabled = false;
    });
};

submitButton.onclick = () => {
  if (textbox.value.length == 0) {
    inputTooShortAlert.hidden = false;
    return;
  }

  submitButton.disabled = true;
  fetch_API(textbox.value);
};

textbox.oninput = () => {
  console.log(textbox.value.length);
  if (textbox.value.length > 0) {
    inputTooShortAlert.hidden = true;
  }
};
