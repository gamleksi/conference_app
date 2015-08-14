//Requirements

var fs = require('fs')
var stream = require('stream');
var readline = require('readline');
var mysql = require('mysql')

//Setting up mysql connection

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'positions'

});

connection.connect();

//Structure of a postion class

function Position(table) {

    this.time = new Date(table[0]);
    this.tag_id = table[1];
    this.x = parseFloat(table[2]);
    this.y = parseFloat(table[3]);

}

//Inserting a table value into the position table

function addTable(posit) {
    var query = connection.query('insert into Position set ?', posit, function(err, result) {
        if (err) {
            console.error(err);
            return false;
        } else {
            console.log(query.sql)
            return true;
        }
    })
};


// Testing if the program continue streaming lines after close event?

var streamsLineAfterCloseEvent = false;


var previousPosition = {};
// Setting up stream

var instream = fs.createReadStream('position_data');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

// When there is a line:

rl.on('line', function(line) {
    var table = line.split(';')
    var newPosition = new Position(table);
    if (previousPosition.hasOwnProperty(newPosition.id)) {
        if (newPosition.time > previousPosition[newPosition.id] && newPosition.x - ) {
            addTable(newPosition);
            previousPosition[newPosition.id] = newPosition.time;
        }
    } else {
        console.log('aleksi');
        addTable(newPosition)
        previousPosition[newPosition.id] = newPosition.time;
    }
});

// No more lines.

rl.on('close', function() {
    console.log('There is no more lines.')
    //	rl.close();
    //	instream.destroy();
    //	console.exit('bye');
});