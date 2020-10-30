const postgres = require('../postgres.js');

$(()=>{

  $('.searches-search').on('submit', (event)=>{
    event.preventDefault();
    let userInput = $('input[type="text"]').val();
    $(event.currentTarget).trigger('reset')


    getData = (req, res)=>{
      postgres.query(`SELECT * FROM searches WHERE city LIKE ${userInput};`, (err, results) => { console.log(response)})
    }


      $('.reset-btn').click(function(){
        $('main').find('div').remove();
          })
        })
  })
