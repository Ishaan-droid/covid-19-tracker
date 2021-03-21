const ctx = document.getElementById('ConfirmedMyChart');

const displayConfirmedGraph = function (data, six_months) {
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

  const lineY_Data = newY_Data.map(cur => Number(cur.dailyconfirmed));

  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: [...newMonths],
      datasets: [
        {
          label: 'Confirmed',
          backgroundColor: 'rgba(255, 99, 132,0.3)',
          borderColor: 'rgb(255, 99, 132)',
          data: [...lineY_Data],
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
};

export default displayConfirmedGraph;
