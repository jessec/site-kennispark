/* File Created: September 2, 2012 */

        google.setOnLoadCallback(drawVisualization);
        function drawVisualization() {
            //******ACTION REQUIRED********
            //Add the url to your Google Drive spreadsheet
            var query =
            new google.visualization.Query('https://docs.google.com/spreadsheet/ccc?key=0AkDJgEzvX6DDdDRMRFRrVXU3REJhMUxVblc3YnprZVE');

            //******ACTION REQUIRED********
            //Apply the query language statement to grab the rows you want from your Google Drive spreadsheet.
            //Query selects columns A,B, and C.
            query.setQuery('SELECT A,B,C,D');

            //Send query with callback function.
            query.send(handleQueryResponse);

            //Handle the response
            function handleQueryResponse(response) {
                if (response.isError()) {
                    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                    return;
                }

                var data = response.getDataTable();

                function drawToolbar() {
                    var components = [
                        { type: 'html', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA' },
                        { type: 'csv', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA' },
                        {
                            type: 'htmlcode', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA',
                        }
                    ];

                    var container = document.getElementById('exportToolbarContainer');
                    google.visualization.drawToolbar(container, components);
                };


                //******ACTION REQUIRED********
                //*******Customize Dashboard*********

                //Category Filter dashboard control
                //This code sets up a category picker to filter data on year
            var categoryPicker = new google.visualization.ControlWrapper({
                'controlType': 'CategoryFilter',
                'containerId': 'categoryFilterContainer',
                'options': {
                    'filterColumnLabel': 'Year',
                    'ui': {
                        'label': 'Filter data to your liking.',
                        'cssClass': 'categoryFilter',
                        'caption': 'Filter by Year',
                        'sortValues': 'true',
                        'selectedValuesLayout': 'belowStacked',
                        'labelStacking': 'vertical',
                        'allowTyping': false,
                        'allowMultiple': true,
                    }
                },

            });

                //Number range filter dashboard control
                //This code demonstrates using a slider to filter numerical data
            var slider = new google.visualization.ControlWrapper({
                'controlType': 'NumberRangeFilter',
                'containerId': 'numberRangeFilterContainer',
                'options': {
                    'filterColumnLabel': 'Sales',
                    //'minValue': 0,
                    //'maxValue': 500,
                    'ui': {
                        label: 'Filter by sales',
                        ticks: 'auto',
                        unitIncrement: 1,
                        blockIncrement: 10,
                        showRangeValues: true,
                        orientation: 'horizontal',
                        labelStacking: 'vertical',
                        cssClass: 'numberRangeFilter'
                    }
                }
            });

                // Define a StringFilter control for the 'Name' column
                //This code demonstrates using a textbox to filter string data
            var stringFilter = new google.visualization.ControlWrapper({
                'controlType': 'StringFilter',
                'containerId': 'stringFilterContainer',
                'options': {
                    'filterColumnLabel': 'Year',
                    'matchType': 'prefix',
                    'caseSensitive': false,
                    'ui': {
                        label: 'Start typing year',
                        labelStacking: 'vertical',
                        //cssClass: 'stringFilter'
                }
                }
            });
            
            // Define a bar chart
            var barchart = new google.visualization.ChartWrapper({
                'chartType': 'BarChart',
                'containerId': 'chartContainer',
                'options': {
                    'height': 500,
                    'width': 600,
                    'hAxis': {title: "Amount"},
                    'vAxis': { title: "Year" },
                    'title': "Company Performance",
                    'legend': 'bottom',
                    'animation': { 'duration': 1000, 'easing': 'out' },
                    'chartArea': { 'left': 150, 'top': 100, 'right': 0, 'bottom': 0, 'height': 'auto' },
                     'colors': ['#551f5b', '#7b3182', '#904299', '#a55ba4', '#b96cac', '#d5a4cb', '#edc7de'] 

                }
            });

            //Get the dashboard object
            var dashboard = new google.visualization.Dashboard(
            document.getElementById('chartRegion'));

            // Register a listener to be notified once the dashboard is ready.
            google.visualization.events.addListener(dashboard, 'ready', dashboardReady);

            // Configure the dashboard so that each control affects the chart,
            // Draw the dashboard.
            dashboard.bind(slider, barchart).draw(data);
            dashboard.bind(categoryPicker, barchart).draw(data);
            dashboard.bind(stringFilter, barchart).draw(data);
            drawToolbar();

            function dashboardReady() {
                // The dashboard is ready to accept interaction. 
                //Additional programmatic actions can be set

                // Change the pie chart rendering options when clicked.
                document.getElementById('btnBigger').onclick = function () {
                    barchart.setOption('width', 900);
                    barchart.setOption('height', 500);
                    barchart.draw();
                };

                // //Make 3d -- Des not apply to all chart types
                //document.getElementById('btn3d').onclick = function () {
                //    barchart.setOption('is3D', true);
                //    barchart.draw();
                //};
            }



        }


            
        }