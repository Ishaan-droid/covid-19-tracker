const rtx = document.getElementById('RecoveredMyChart');

const displayActiveGraph = function (data, six_months) {
  const now = new Date();
  let [newMonths, yData] = [[], []];
  let newY_Data;

  for (let i = 6; i > 0; i -= 1) {
    let d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    newMonths.push(six_months[d.getMonth()]);
  }

  data.forEach(cur => {
    if (cur.date.startsWith(30)) {
      yData.push(cur);
      newY_Data = yData.slice(-5);
    }
    cur.date.startsWith(28) && newY_Data.push(cur);
  });

  const lineY_Data = newY_Data.map(cur => Number(cur.dailyrecovered));

  const chart = new Chart(rtx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: [...newMonths],
      datasets: [
        {
          label: 'Recovered',
          backgroundColor: 'rgba(22, 219, 68,0.3)',
          borderColor: 'rgb(22, 219, 68)',
          data: [...lineY_Data],
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
};

export default displayActiveGraph;
