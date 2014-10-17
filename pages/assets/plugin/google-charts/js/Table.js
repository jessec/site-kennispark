/* File Created: September 2, 2012 */

        google.setOnLoadCallback(drawVisualization);
        function drawVisualization() {
            //******ACTION REQUIRED********
            //Add the url to your Google Drive spreadsheet
            var query =
            new google.visualization.Query('https://docs.google.com/spreadsheet/ccc?key=0AkDJgEzvX6DDdHhLbHUybmhUT0t2c28ydUZNcWtwb0E');

            //******ACTION REQUIRED********
            //Apply the query language statement to grab the rows you want from your Google Drive spreadsheet.
            //Query selects columns A,B, and C.
            query.setQuery('SELECT A,B,C');

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
                        { type: 'html', datasource: 'https://docs.google.com/spreadsheet/ccc?key=0AkDJgEzvX6DDdHhLbHUybmhUT0t2c28ydUZNcWtwb0E' },
                        { type: 'csv', datasource: 'https://docs.google.com/spreadsheet/ccc?key=0AkDJgEzvX6DDdHhLbHUybmhUT0t2c28ydUZNcWtwb0E' },
                        {
                            type: 'htmlcode', datasource: 'https://docs.google.com/spreadsheet/ccc?key=0AkDJgEzvX6DDdHhLbHUybmhUT0t2c28ydUZNcWtwb0E',
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
                    'filterColumnIndex': 0,
                    'ui': {
                        'label': 'Filter data to your liking.',
                        'cssClass': 'categoryFilter',
                        'caption': 'Filter',
                        'sortValues': 'true',
                        'selectedValuesLayout': 'belowStacked',
                        'labelStacking': 'vertical',
                        'allowTyping': false,
                        'allowMultiple': true,
                    }
                },

            });

                // Define a StringFilter control for the 'Name' column
                //This code demonstrates using a textbox to filter string data
            var stringFilter = new google.visualization.ControlWrapper({
                'controlType': 'StringFilter',
                'containerId': 'stringFilterContainer',
                'options': {
                    'filterColumnIndex': 0,
                    'matchType': 'prefix',
                    'caseSensitive': false,
                    'ui': {
                        label: 'Filter by typed string',
                        labelStacking: 'vertical',
                        //cssClass: 'stringFilter'
                }
                }
            });
            
            // Define a pie chart
            var tablechart = new google.visualization.ChartWrapper({
                'chartType': 'Table',
                'containerId': 'chartContainer',
                'options': {
                    'height': 500,
                    'width': 450,
                    'hAxis': {title: "Horizontal Axis Value"},
                    'vAxis': { title: "Vertical Axis Value" },
                    'title': "Basic Table",
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
            dashboard.bind(categoryPicker, tablechart).draw(data);
            dashboard.bind(stringFilter, tablechart).draw(data);
            drawToolbar();

            function dashboardReady() {
                // The dashboard is ready to accept interaction. 
                //Additional programmatic actions can be set

                // Change the pie chart rendering options when clicked.
                document.getElementById('btnBigger').onclick = function () {
                    tablechart.setOption('width', 900);
                    tablechart.setOption('height', 500);
                    tablechart.draw();
                };

                // //Make 3d -- Des not apply to all chart types
                //document.getElementById('btn3D').onclick = function () {
                //    orgchart.setOption('is3D', true);
                //    orgchart.draw();
                //};
            }



        }


            
        }