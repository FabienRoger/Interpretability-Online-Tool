const process_table = (table) => {
  const labels = table.map((item) => `Layer ${item[0] + 1}`);
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
  const resultChart = new Chart(
    document.getElementById("result-chart"),
    config
  );
  return resultChart;
};

const draw_chart = (table, resultChart) => {
  const { labels, values } = process_table(table);
  if (resultChart) {
    resultChart.destroy();
  }
  resultChart = draw_new_chart(labels, values);
  return resultChart;
};

export { draw_chart };
