const get_labels = (table) => {
  const percentiles_nb = table[0][1].length;
  return [...Array(percentiles_nb).keys()].map((i) => {
    if (i === 0) return "Least activated neuron";
    if (percentiles_nb - 1 === i) return "Most activated neuron";
    return `Top ${percentiles_nb - i}%`;
  });
};

const get_chart_data = (table) => {
  return table.map((layer_info) => {
    const [layer_number, percentiles, top, bot] = layer_info;
    return {
      data: percentiles,
      label: `Layer ${layer_number + 1}`,
      borderColor: `hsl(${
        (layer_number * 255 * 0.5) / table.length
      }, 80%, 50%)`,
      fill: false,
    };
  });
};

const get_chart_config = (datasets, labels) => {
  return {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      scales: {
        xAxis: {
          ticks: {
            font: {
              size: 10,
            },
          },
        },
      },
    },
  };
};

const draw_new_chart = (table, labels) => {
  const datasets = get_chart_data(table);
  const config = get_chart_config(datasets, labels);
  const resultChart = new Chart(
    document.getElementById("result-chart"),
    config
  );
  return resultChart;
};

const draw_chart = (table, resultChart) => {
  const labels = get_labels(table);
  if (resultChart) {
    resultChart.destroy();
  }
  resultChart = draw_new_chart(table, labels);
  return resultChart;
};

export { draw_chart };
