const dtx = document.getElementById('DeceasedMyChart');

const displayDeceasedGraph = function (data, six_months) {
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

  const lineY_Data = newY_Data.map(cur => Number(cur.dailydeceased));

  const chart = new Chart(dtx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: [...newMonths],
      datasets: [
        {
          label: 'Deceased',
          backgroundColor: 'rgba(108, 117, 125,0.6)',
          borderColor: 'rgb(108, 117, 125)',
          data: [...lineY_Data],
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
};

export default displayDeceasedGraph;
