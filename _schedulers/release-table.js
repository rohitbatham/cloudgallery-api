import schedule  from 'node-schedule';
import connection from "./../_config/dbconfig.js";
import addSubtractDate from "add-subtract-date"; 
schedule.scheduleJob('* * * * *', function() {
    CheckTableStatus();
});
const CheckTableStatus = () => {
    const sqlQuery = `SELECT * FROM tablemgmt WHERE status = 'Booked'`;
    connection.query(sqlQuery, function (error, results) {
        if (error) { 
            console.log('There was some error in processing', error)
        }else{
            if(results.length){
                results.map(({
                    id,
                    uuid,
                    status,
                    bookfor,
                    booked_at
                }) => {
                    const currentTime = new Date().getTime();
                    console.log('Table id '+ id + ' is ' + status + ' for ' + parseInt(bookfor)*60 +  " minutes at " + booked_at);
                    const tableReleaseTime = addSubtractDate.add(booked_at, parseInt(bookfor)*60, "minutes");
                    console.log('This table will be released at ' + tableReleaseTime);

                   if(currentTime > tableReleaseTime){
                       console.log('Time is over, releasing table...')
                       ReleaseTable(id, uuid);
                   }
                })
            }
        }        
    });
}

const ReleaseTable = (id, uuid) => {
    const sqlQuery = `UPDATE tablemgmt SET status = "Available" WHERE uuid = '${uuid}'
    AND id = '${id}'`;
    connection.query(sqlQuery);    
}

export default () => {
    console.log('calling scheduler')
    CheckTableStatus();
}