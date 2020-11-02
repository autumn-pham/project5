$(() => {
  $('.searches-search').on('submit', (event)=>{
    event.preventDefault();
    let userInput = $('input[type="text"][name="get-searches"]').val();
    $(event.currentTarget).trigger('reset')
    console.log(userInput);

    $.ajax({
      url: '/data/searches'

    }).then(
      (data)=>{
        console.log(data.rows)
        let searchData = [];


        for(let i=0; i < data.rows.length; i++){
          console.log(data.rows[i].city)
          if (data.rows[i].city === userInput) {
            searchData.push(data.rows[i]);
          }

        }
        console.log(searchData)
        for(let i=0; i < searchData.length; i++){
          let newDiv = $('<div>').addClass('card search-card').attr('id', i)
          let newName = $('<h5>').text(searchData[i].fname + " " + searchData[i].lname).css('text-align', 'center').addClass('card-body card-text')
          let newText = $('<p>').text("is searching for some").css('text-align', 'center').addClass('card-body card-text')
          let newSport = $('<p>').text(searchData[i].sport + " " + searchData[i].activity).css('text-align', 'center').addClass('card-body card-text')
          $('main').append(newDiv)
          newDiv.append(newName)
          newDiv.append(newText)
          newDiv.append(newSport)

        }

      },
        (error) => {
          console.log(error);
        }
       )
       $('.reset-btn').click(function(){
      $('main').find('div').remove();
        })
    

   })


})
