import displayConfirmedGraph from './confirmedGraph.js';
import displayActiveGraph from './recoveredGraph.js';
import displayDeceasedGraph from './deceasedGraph.js';
import months from './months.js';
import { updateSummary, dailyUpdate, updateProgress, updateTable } from './updatingStats.js';

// DISPLAY CHARTS

const displayCharts = function (data, six_months) {
  displayConfirmedGraph(data, six_months);
  displayActiveGraph(data, six_months);
  displayDeceasedGraph(data, six_months);
};

// LOAD AND DISPLAY DATA

(async function () {
  const response = await fetch(`https://data.covid19india.org/data.json`);
  const data = await response.json();

  // Destructuring Data
  const { confirmed, active, recovered, deaths } = data.statewise[0];
  const { statewise } = data;

  const {
    deltaconfirmed: dailyConfirmed,
    deltarecovered: dailyRecovered,
    deltadeaths: dailyDeaths,
  } = data.statewise[0];

  const lineData = JSON.parse(JSON.stringify(data.cases_time_series));

  // 1. Updating Summary Data
  updateSummary(confirmed, active, recovered, deaths);

  // 2. Updating daily count
  dailyUpdate(dailyConfirmed, dailyRecovered, dailyDeaths);

  // 3. Updating Progress Bar
  updateProgress(confirmed, active, recovered, deaths);

  // 4. Displaying Graph
  displayCharts(lineData, months);

  // 5. Updating Table
  updateTable(statewise.slice(1));
})();
