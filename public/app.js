$(()=>{
  $('.searches-search').on('submit', (event)=>{
    event.preventDefault();
    let userInput = $('input[type="text"]').val();
    $(event.currentTarget).trigger('reset')


    $.ajax({
      url: '/data&q=' + userInput

    }).then(
      (data)=>{
        console.log(data)
      })

    })
})
