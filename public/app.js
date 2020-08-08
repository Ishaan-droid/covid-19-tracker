//Rendering data from API
async function fetchData() {
    try {
        const data = await fetch(`https://api.covid19india.org/data.json`);
        let readableData = await data.json();
        //console.log(readableData);


        //Define the stats from the API
        let confirmedNumber = parseInt(readableData.statewise[0].confirmed);
        let activeNumber = parseInt(readableData.statewise[0].active);
        let recoveredNumber = parseInt(readableData.statewise[0].recovered);
        let deceasedNumber = parseInt(readableData.statewise[0].deaths);


        //Creating function to alter summary numbers
        summaryChange = (con, act, rec, dec) => {
            document.querySelector('.confirmed p').textContent = con;
            document.querySelector('.active p').textContent = act;
            document.querySelector('.recovered p').textContent = rec;
            document.querySelector('.deceased p').textContent = dec;
        }


        //Calling the function to update summary numbers
        summaryChange(confirmedNumber, activeNumber, recoveredNumber, deceasedNumber);


        //Creating function to alter daily count numbers
        dailyAlterNumberChange = () => {
            let dailyConfirmed = parseInt(readableData.statewise[0].deltaconfirmed);
            let dailyRecovered = parseInt(readableData.statewise[0].deltarecovered);
            let dailyDeath = parseInt(readableData.statewise[0].deltadeaths);
            let dailyActive = 0;

            //Calculating the daily confirmed count
            /*
            readableData.statewise.forEach((cur) => {
                if (!cur.deltaconfirmed.startsWith("-"))
                    dailyConfirmed += parseInt(cur.deltaconfirmed);
            });
            */

            //Updating the daily confirmed count
            document.querySelector('.confirmed h6').textContent = `+${dailyConfirmed}`;

            //Updating the daily recovery count
            document.querySelector('.recovered h6').textContent = `+${dailyRecovered}`;

            //Updating the daily deceased count
            document.querySelector('.deceased h6').textContent = `+${dailyDeath}`;

            //Updating the daily active count
            if (dailyConfirmed > dailyRecovered) {
                dailyActive = dailyConfirmed - dailyRecovered;
                document.querySelector('.active h6').textContent = `+${dailyActive}`;
            }

            //If the recovery count is more
            else if (dailyConfirmed < dailyRecovered) {
                document.querySelector('.active h6').textContent = '';
            }

            //If the recovery and confirmed count are equal
            else {
                document.querySelector('.active h6').textContent = 0;
            }


        };


        //Calling the function to update daily numbers
        dailyAlterNumberChange();


        //Creating function to update table count
        tableCount = () => {
            for (let i = 1; i < readableData.statewise.length; i++) {
                //Declaring variables
                let deltaconfirmed = readableData.statewise[i].deltaconfirmed;
                let deltarecovered = readableData.statewise[i].deltarecovered;
                let deltaDeath = readableData.statewise[i].deltadeaths;

                $("tbody").append(`<tr>
                           <th scope="row">${readableData.statewise[i].state}</th>
                           <td>${readableData.statewise[i].confirmed} <span style="color : red"><p>↑${deltaconfirmed}</p></span></td>
                           <td>${readableData.statewise[i].active} </td>
                           <td>${readableData.statewise[i].recovered} <span style="color : green"><p>↑${deltarecovered}</p></span></td>
                           <td>${readableData.statewise[i].deaths} <span style="color : #393e46"><p>↑${deltaDeath}</p></span></td>
                         </tr>`);
            }
        };


        //Calling the function to update table count
        tableCount();

        //Creating a function to alter progress bar
        progressChange = () => {
            let con = Math.round((confirmedNumber / 10000000) * 100);
            document.querySelector('.confirmed .progress-bar').setAttribute('style', 'width:' + con + '%');

            let act = Math.round((activeNumber / 10000000) * 100);
            document.querySelector('.active .progress-bar').setAttribute('style', 'width:' + act + '%');

            let rec = Math.round((recoveredNumber / 10000000) * 100);
            document.querySelector('.recovered .progress-bar').setAttribute('style', 'width:' + rec + '%');

            let dec = Math.round((deceasedNumber / 10000000) * 100);
            document.querySelector('.deceased .progress-bar').setAttribute('style', 'width:' + dec + '%');
        };


        //Calling to update the progress bar
        progressChange();

        //Google pie chart
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            //Define pie through google chart
            var data = google.visualization.arrayToDataTable([
                ['Category', 'Numbers'],
                ['Recovered', recoveredNumber],
                ['Deceased', deceasedNumber],
                ['Active', activeNumber]
            ]);

            var options = {
                title: 'Covid Data Distribution'
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));

            chart.draw(data, options);
        };

    }
    //Catching error incase it occurs
    catch (error) {
        console.log(error);
    }
}

fetchData();