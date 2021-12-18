// Defining Fields
const summaryConfirmed = document.querySelector('.confirmed p');
const summaryActive = document.querySelector('.active p');
const summaryRecovered = document.querySelector('.recovered p');
const summaryDeceased = document.querySelector('.deceased p');

const todayConfirmed = document.querySelector('.confirmed-plus');
const todayActive = document.querySelector('.active-plus');
const todayRecovered = document.querySelector('.recovered-plus');
const todayDeceased = document.querySelector('.deceased-plus');

const confirmedProgress = document.querySelector('.bg-danger');
const activeProgress = document.querySelector('.bg-info');
const recoveredProgress = document.querySelector('.bg-success');
const deceasedProgress = document.querySelector('.dec-bar-color');

// Number International Format

const internationalFormat = count => new Intl.NumberFormat().format(Number(count));

// Converting To Percentage

const convertPercentage = count => Math.trunc((count / (5 * Math.pow(10, 7))) * 100);

// UPDATING SUMMARY

export const updateSummary = function (confirmed, active, recovered, deaths) {
  summaryConfirmed.textContent = internationalFormat(confirmed);
  summaryActive.textContent = internationalFormat(active);
  summaryRecovered.textContent = internationalFormat(recovered);
  summaryDeceased.textContent = internationalFormat(deaths);
};

// UPDATING DAILY COUNT

export const dailyUpdate = function (confirmed, recovered, deaths) {
  todayConfirmed.textContent = `+${internationalFormat(confirmed)}`;
  todayRecovered.textContent = `+${internationalFormat(recovered)}`;
  todayDeceased.textContent = `+${internationalFormat(deaths)}`;

  Number(confirmed) >= Number(recovered)
    ? (todayActive.textContent = `+${internationalFormat(confirmed - recovered)}`)
    : (todayActive.textContent = 0);
};

// UPDATING PROGRESS BAR

export const updateProgress = function (confirmed, active, recovered, deaths) {
  confirmedProgress.setAttribute('style', `width: ${convertPercentage(confirmed)}%`);
  activeProgress.setAttribute('style', `width: ${convertPercentage(active)}%`);
  recoveredProgress.setAttribute('style', `width: ${convertPercentage(recovered)}%`);
  deceasedProgress.setAttribute('style', `width: ${convertPercentage(deaths)}%`);
};

// UPDATING TABLE

export const updateTable = function (data) {
  data.sort((a, b) => {
    const { deltaconfirmed: aConfirmed } = a;
    const { deltaconfirmed: bConfirmed } = b;
    return bConfirmed - aConfirmed;
  });
  data.forEach((_, idx) => {
    const html = `<tr>
                <th style="vertical-align : middle">${data[idx].state}</th>
                <td><span style="color : red"><p style="margin-bottom : 0rem">↑${
                  data[idx].deltaconfirmed === '0' ? '-' : data[idx].deltaconfirmed
                }</p></span> ${internationalFormat(data[idx].confirmed)} </td>
                <td style="vertical-align : middle">${internationalFormat(data[idx].active)} </td>
                <td><span style="color : green"><p style="margin-bottom : 0rem">↑${
                  data[idx].deltarecovered === '0' ? '-' : data[idx].deltarecovered
                }</p></span>${internationalFormat(data[idx].recovered)}</td>
                <td><span style="color : #393e46"><p style="margin-bottom : 0rem">↑${
                  data[idx].deltadeaths === '0' ? '-' : data[idx].deltadeaths
                }</p></span>${internationalFormat(data[idx].deaths)}</td>
                </tr>`;

    document.querySelector('.table_body').insertAdjacentHTML('beforeend', html);
  });
};
